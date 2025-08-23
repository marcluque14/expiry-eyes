// gmailServer.js
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || 'http://localhost';

const TOKEN_PATH = path.join(__dirname, 'token.json');

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// Carrega el token si existeix
if (fs.existsSync(TOKEN_PATH)) {
  try {
    const tokenRaw = fs.readFileSync(TOKEN_PATH, 'utf-8');
    oAuth2Client.setCredentials(JSON.parse(tokenRaw));
  } catch (e) {
    console.warn('⚠️  No s\'ha pogut carregar token.json. Executa send_gmail.js per regenerar-lo.');
  }
} else {
  console.warn('⚠️  No s\'ha trobat token.json. Executa send_gmail.js per generar-lo.');
}

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send', async (req, res) => {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    return res.status(500).json({ error: 'Falten variables d\'entorn GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET' });
  }
  const creds = oAuth2Client.credentials || {};
  if (!creds.access_token && !creds.refresh_token) {
    return res.status(400).json({ error: 'No hi ha token OAuth. Executa send_gmail.js per generar token.json' });
  }
  const { nombre_comercio, persona_contacto, email, telefono, ciudad } = req.body;

  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

  const emailLines = [
    `To: expiryeyes@gmail.com`,
    `Subject: Nueva solicitud: ${nombre_comercio}`,
    'Content-Type: text/html; charset=UTF-8',
    '',
    `<div style="font-family:sans-serif;padding:16px;">
      <h2>🌱 Nueva solicitud de comercio</h2>
      <p><strong>Nombre:</strong> ${nombre_comercio}</p>
      <p><strong>Contacto:</strong> ${persona_contacto}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Ciudad:</strong> ${ciudad}</p>
      <p><strong>Teléfono:</strong> ${telefono}</p>
    </div>`
  ];

  const rawMessage = Buffer.from(emailLines.join('\n'))
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  try {
    const response = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: rawMessage
      }
    });

    console.log('✅ Correo enviado con ID:', response.data.id);
    res.json({ success: true, id: response.data.id });
  } catch (err) {
    console.error('⛔ Error al enviar el correo:', err);
    res.status(500).json({ error: 'Error enviando el correo' });
  }
});

app.listen(3000, () => {
  console.log('🚀 Servidor Gmail escoltant a http://localhost:3000  (POST /send)');
});