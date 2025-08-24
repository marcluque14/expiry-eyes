<template>
    <ion-page>
      <ion-content :fullscreen="true" class="ion-padding login-container">
        <div class="login-box">
          <div class="logo-container">
            <img src="@/assets/logo.png" alt="ExpiryEyes Logo" class="expiryeyes-logo" />
          </div>
          <h2>Benvingut/da de nou</h2>
          <p>Introdueix les teves credencials per iniciar sessió.</p>
  
          <!-- Formulari login -->
          <form @submit.prevent="login">
            <div class="form-group">
              <label for="email">Correu electrònic</label>
              <input
                id="email"
                type="email"
                v-model="username"
                placeholder="Introdueix el teu correu electrònic"
                required
              />
            </div>
  
            <div class="form-group">
              <label for="password">Contrasenya</label>
              <input
                id="password"
                type="password"
                v-model="password"
                placeholder="Introdueix la teva contrasenya"
                required
              />
            </div>
  
            <ion-button
              expand="block"
              shape="round"
              class="login-button"
              type="submit"
              :disabled="isLoading"
            >
              Iniciar sessió
            </ion-button>
          </form>
  
          <!-- Botons socials -->
          <div class="social-login-buttons">
            <button type="button" class="social-btn apple-btn" @click="signInWithApple" title="Inicia sessió amb Apple">
              <img src="@/assets/apple.jpeg" alt="Apple" />
            </button>
            <button type="button" class="social-btn google-btn" @click="signInWithGoogle" title="Inicia sessió amb Google">
              <img src="@/assets/google.jpg" alt="Google" />
            </button>
          </div>
  
          <div class="extra-links">
            <ion-button fill="clear" class="forgot-button" @click="forgotPassword">
              Has oblidat la contrasenya?
            </ion-button>
            <p>
              Encara no tens compte?
              <ion-button fill="clear" class="signup-button" @click="goToSignup">
                Registra't
              </ion-button>
            </p>
          </div>
  
          <ion-spinner v-if="isLoading" name="dots"></ion-spinner>
  
          <!-- Modal registre -->
          <ion-modal :is-open="showRegister" @did-dismiss="showRegister = false">
            <ion-header>
              <ion-toolbar>
                <ion-title>Crear Compte</ion-title>
                <ion-buttons slot="end">
                  <ion-button @click="showRegister = false">Tanca</ion-button>
                </ion-buttons>
              </ion-toolbar>
            </ion-header>
  
            <ion-content class="ion-padding">
              <ion-list>
                <ion-item>
                  <ion-label position="floating">Nom</ion-label>
                  <ion-input v-model="registerUsername"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label position="floating">Correu electrònic</ion-label>
                  <ion-input v-model="registerEmail" type="email"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label position="floating">Contrasenya</ion-label>
                  <ion-input v-model="registerPassword" type="password"></ion-input>
                </ion-item>
              </ion-list>
              <ion-button expand="block" @click="registerUser" :disabled="isLoading">
                Registrar
              </ion-button>
            </ion-content>
          </ion-modal>
          <ion-modal :is-open="showForgotPassword" @did-dismiss="showForgotPassword = false">
            <ion-header>
              <ion-toolbar>
                <ion-title>Restablir contrasenya</ion-title>
                <ion-buttons slot="end">
                  <ion-button @click="showForgotPassword = false">Tanca</ion-button>
                </ion-buttons>
              </ion-toolbar>
            </ion-header>
            <ion-content class="ion-padding">
              <ion-list>
                <ion-item>
                  <ion-label position="floating">Correu electrònic</ion-label>
                  <ion-input v-model="resetEmail" type="email"></ion-input>
                </ion-item>
              </ion-list>
              <ion-button expand="block" @click="requestPasswordReset" :disabled="resetIsLoading">
                Enviar instruccions
              </ion-button>
            </ion-content>
          </ion-modal>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';

  const XANO_AUTH_BASE = import.meta.env.VITE_XANO_AUTH_BASE || '';
  const XANO_OAUTH_BASE = import.meta.env.VITE_XANO_OAUTH_BASE || XANO_AUTH_BASE || '';
  
  const username = ref('');
  const password = ref('');
  const showRegister = ref(false);
  const registerUsername = ref('');
  const registerEmail = ref('');
  const registerPassword = ref('');
  const isLoading = ref(false);
  const showForgotPassword = ref(false);
  const resetEmail = ref('');
  const resetIsLoading = ref(false);
  
  const router = useRouter();
  
  function saveSession(token: string) {
    localStorage.setItem('expiry-eyes-token', token);
  }
  
  function getSession() {
    return localStorage.getItem('expiry-eyes-token');
  }
  
  async function redirectAccordingToRole(role: string) {
    if (role === 'empresa') {
      await router.push('/home-empresa');
    } else {
      await router.push('/tabs/home');
    }
  }
  
  async function login() {
    if (!username.value || !password.value) {
      alert('Si us plau, introdueix correu i contrasenya');
      return;
    }
    isLoading.value = true;
    try {
      const res = await axios.post('https://xqy3-nsl3-g9gf.n7e.xano.io/api:B0XRi_En/auth/login', {
        email: username.value,
        password: password.value,
      });
  
      if (res.data && res.data.authToken) {
        saveSession(res.data.authToken);

        const userRes = await axios.get('https://xqy3-nsl3-g9gf.n7e.xano.io/api:B0XRi_En/auth/me', {
          headers: { Authorization: `Bearer ${res.data.authToken}` }
        });

        if (userRes.data && userRes.data.email) {
          localStorage.setItem('user_id', userRes.data.id);
          await redirectAccordingToRole(userRes.data.role);
        } else {
          alert('No s\'ha pogut obtenir la informació de l\'usuari');
        }
      } else {
        alert('Usuari o contrasenya incorrectes');
      }
    } catch (error: any) {
      alert('Error de connexió o credencials: ' + (error.response?.data?.message || error.message));
    } finally {
      isLoading.value = false;
    }
  }
  
  async function registerUser() {
    if (!registerUsername.value || !registerEmail.value || !registerPassword.value) {
      alert('Si us plau, completa tots els camps');
      return;
    }
    isLoading.value = true;
    try {
      const res = await axios.post('https://xqy3-nsl3-g9gf.n7e.xano.io/api:B0XRi_En/auth/signup', {
        name: registerUsername.value,
        email: registerEmail.value,
        password: registerPassword.value,
      });

      if (res.data && (res.data.token || res.data.authToken)) {
        saveSession(res.data.token || res.data.authToken);
        alert('Usuari registrat amb èxit');
        showRegister.value = false;
        registerUsername.value = '';
        registerEmail.value = '';
        registerPassword.value = '';

        const meRes = await axios.get('https://xqy3-nsl3-g9gf.n7e.xano.io/api:B0XRi_En/auth/me', {
          headers: { Authorization: `Bearer ${res.data.token || res.data.authToken}` }
        });
        // Guarda el user_id al localStorage just després d'obtenir meRes
        localStorage.setItem('user_id', meRes.data.id);

        await redirectAccordingToRole(meRes.data.role);
      } else {
        alert('Error en registrar usuari');
      }
    } catch (error: any) {
      alert('Error en registrar usuari: ' + (error.response?.data?.message || error.message));
    } finally {
      isLoading.value = false;
    }
  }
  
  function forgotPassword() {
    showForgotPassword.value = true;
  }
  
  async function requestPasswordReset() {
    if (!resetEmail.value) {
      alert('Introdueix el teu correu electrònic');
      return;
    }
    if (!XANO_AUTH_BASE) {
      alert('Falta configurar VITE_XANO_AUTH_BASE amb el grup que té /auth/request_password_reset a Xano.');
      return;
    }
    resetIsLoading.value = true;
    try {
      await axios.post(`${XANO_AUTH_BASE}/auth/request_password_reset`, { email: resetEmail.value });
      alert('Si el correu existeix, t\'hem enviat les instruccions per restablir la contrasenya.');
      showForgotPassword.value = false;
      resetEmail.value = '';
    } catch (error: any) {
      const msg = error?.response?.data?.message || error?.message || 'Error desconegut';
      alert('No s\'ha pogut enviar el correu de restabliment: ' + msg);
    } finally {
      resetIsLoading.value = false;
    }
  }
  
  async function signInWithGoogle() {
    try {
      if (!XANO_OAUTH_BASE) {
        alert('Falta configurar VITE_XANO_OAUTH_BASE con el grupo que tiene /oauth/google/init.');
        return;
      }
      const REDIRECT_URI = import.meta.env.GOOGLE_REDIRECT_URI || 'http://localhost:5173/oauth/google/callback';
      const res = await axios.get(`${XANO_OAUTH_BASE}/oauth/google/init`, {
        params: {
          redirect_uri: REDIRECT_URI,
        },
      });
      if (res.data && res.data.authUrl) {
        window.location.href = res.data.authUrl;
      } else {
        console.error('Respuesta inesperada de init OAuth:', res.data);
        alert('No se ha podido obtener la URL de autenticación de Google.');
      }
    } catch (error: any) {
      const msg = error?.response?.data?.message || error?.message || 'Error desconegut';
      alert('Error en login Google: ' + msg);
      console.error(error);
    }
  }
  
  function signInWithApple() {
    alert('Funcionalitat login Apple pendent de implementar');
  }
  
  function goToSignup() {
    router.push('/signup');
  }
  
  onMounted(async () => {
    const token = getSession();
    if (!token) {
      router.push("/login");
      return;
    }
    isLoading.value = true;
    try {
      const res = await axios.get('https://xqy3-nsl3-g9gf.n7e.xano.io/api:B0XRi_En/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data && res.data.email) {
        await redirectAccordingToRole(res.data.role);
      } else {
        localStorage.removeItem('expiry-eyes-token');
      }
    } catch {
      localStorage.removeItem('expiry-eyes-token');
    } finally {
      isLoading.value = false;
    }
  });
  </script>
  
  <style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f6f8fa;
  padding-top: 0;
}
  
  .login-box {
    background-color: white;
    padding: 2rem 2.5rem;
    width: 90%;
    max-width: 400px;
    border-radius: 16px;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
    text-align: center;
    margin-left: 20px;
  }
  
  .logo-container {
    margin: 0 auto 1.5rem;
    width: 60px;
    height: 60px;
  }
  
  .expiryeyes-logo {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  h2 {
    margin: 0;
    font-weight: 600;
    font-size: 24px;
    margin-bottom: 8px;
  }
  
  p {
    color: black !important;
    margin-bottom: 1.5rem;
    font-size: 14px;
  }
  
  ion-list {
    margin-bottom: 1.5rem;
  }
  
  .login-button {
    background-color: black !important;
    color: white !important;
    border: none !important;
    box-shadow: none !important;
    font-weight: 600 !important;
    border-radius: 8px !important;
    height: 48px;
    font-size: 16px !important;
    margin-bottom: 1rem;
  }
  
  .extra-links {
    font-size: 14px;
    color: #444;
  }
  
  .extra-links p {
    margin-top: 0.5rem;
  }
  
  .extra-links ion-button {
    font-size: 14px;
    padding: 0;
    --background: none;
    --box-shadow: none;
    color: #0a84ff;
  }
  
  .extra-links ion-button:hover {
    text-decoration: underline;
  }
  
  .form-group {
    margin-bottom: 1rem;
    text-align: left;
  }
  
  .form-group label {
    font-weight: 600;
    margin-bottom: 0.25rem;
    display: block;
    color: #333;
  }
  
.form-group input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border: 1.5px solid #a1a1a1;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.3s ease;
  color: white;
  background-color: #2b2b2b;
}

.form-group input::placeholder {
  color: #b5b5b5;
}

.form-group input:focus {
  border-color: black;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.25);
}
  
  .social-login-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin: 1rem 0 1.5rem 0;
  }
  
  .social-btn {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    border: 1px solid #a1a1a1;
    background: white;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    transition: box-shadow 0.2s ease;
  }
  
  .social-btn:hover {
    box-shadow: 0 0 8px rgba(0,0,0,0.2);
  }
  
  .social-btn img {
    width: 24px;
    height: 24px;
    object-fit: contain;
    border-radius: 6px;
  }
  
  .social-btn.apple-btn {
    border-color: black;
  }
  
  .social-btn.google-btn {
    border-color: #4285F4;
  }
  </style>