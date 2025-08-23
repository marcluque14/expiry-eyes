import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import open from 'open';
import { google } from 'googleapis';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Per obtenir __dirname (no disponible en ESM directament)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || 'http://localhost';
if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('❌ Falten variables d\'entorn GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET');
  process.exit(1);
}

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const TOKEN_PATH = path.join(__dirname, 'token.json');

function authorize() {
  if (fs.existsSync(TOKEN_PATH)) {
    const token = fs.readFileSync(TOKEN_PATH);
    oAuth2Client.setCredentials(JSON.parse(token));
    sendEmail();
  } else {
    getNewToken();
  }
}

function getNewToken() {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/gmail.send'],
  });
  console.log('🔗 Autoritza accedint a aquesta URL:\n', authUrl);
  open(authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('\n📥 Introdueix el codi d’autorització: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('⛔ Error al recuperar el token', err);
      oAuth2Client.setCredentials(token);
      try {
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
        console.log('✅ Token guardat a', TOKEN_PATH);
      } catch (e) {
        console.error('❌ No s\'ha pogut escriure token.json:', e);
      }
      sendEmail();
    });
  });
}

function sendEmail() {
  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

  const emailLines = [
    'To: destinatari@gmail.com',
    'Subject: Prova des de Gmail API',
    '',
    'Hola! Aquest és un correu enviat via la Gmail API des de Node.js.',
  ];

  const rawMessage = Buffer.from(emailLines.join('\n'))
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  gmail.users.messages.send(
    {
      userId: 'me',
      requestBody: {
        raw: rawMessage,
      },
    },
    (err, res) => {
      if (err) return console.error('⛔ Error en enviar el correu', err);
      console.log('✅ Correu enviat amb èxit! ID:', res.data.id);
    }
  );
}

authorize();