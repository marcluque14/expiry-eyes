<template>
    <ion-page>
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Expiry Eyes Login</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content :fullscreen="true" class="ion-padding">
        <div class="login-container">
          <img src="@/assets/logo.png" alt="Expiry Eyes Logo" class="logo" />
  
          <ion-list lines="none" v-if="!isLoading">
            <ion-item>
              <ion-label position="floating">Email</ion-label>
              <ion-input type="email" v-model="username" autofocus></ion-input>
            </ion-item>
  
            <ion-item>
              <ion-label position="floating">Password</ion-label>
              <ion-input type="password" v-model="password"></ion-input>
            </ion-item>
          </ion-list>
  
          <ion-button
            expand="block"
            shape="round"
            class="login-button"
            @click="login"
            :disabled="isLoading"
            v-if="!isLoading"
          >
            Iniciar Sesión
          </ion-button>
  
          <ion-button
            expand="block"
            shape="round"
            color="tertiary"
            @click="showRegister = true"
            :disabled="isLoading"
            v-if="!isLoading"
          >
            Crear Cuenta Nueva
          </ion-button>
  
          <ion-spinner v-if="isLoading" name="dots"></ion-spinner>
  
          <!-- Modal registro -->
          <ion-modal :is-open="showRegister" @did-dismiss="showRegister = false">
            <ion-header>
              <ion-toolbar>
                <ion-title>Crear Cuenta</ion-title>
                <ion-buttons slot="end">
                  <ion-button @click="showRegister = false">Cerrar</ion-button>
                </ion-buttons>
              </ion-toolbar>
            </ion-header>
  
            <ion-content class="ion-padding">
              <ion-list>
                <ion-item>
                  <ion-label position="floating">Nombre</ion-label>
                  <ion-input v-model="registerUsername"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label position="floating">Email</ion-label>
                  <ion-input v-model="registerEmail" type="email"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label position="floating">Contraseña</ion-label>
                  <ion-input v-model="registerPassword" type="password"></ion-input>
                </ion-item>
              </ion-list>
              <ion-button expand="block" @click="registerUser" :disabled="isLoading">
                Registrar
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
  
  const username = ref('');
  const password = ref('');
  const showRegister = ref(false);
  const registerUsername = ref('');
  const registerEmail = ref('');
  const registerPassword = ref('');
  const isLoading = ref(false);
  const router = useRouter();
  
  function saveSession(token: string) {
    localStorage.setItem('expiry-eyes-token', token);
  }
  
  function getSession() {
    return localStorage.getItem('expiry-eyes-token');
  }
  
  async function redirectAccordingToRole(email: string) {
    if (email === 'marc12@gmail.com') {
      await router.push('/home-empresa');
    } else {
      await router.push('/tabs/home');
    }
  }
  
  async function login() {
    isLoading.value = true;
    try {
      const res = await axios.post('https://x8ki-letl-twmt.n7.xano.io/api:B0XRi_En/auth/login', {
        email: username.value,
        password: password.value,
      });
  
      if (res.data && res.data.authToken) {
        saveSession(res.data.authToken);
  
        const userRes = await axios.get('https://x8ki-letl-twmt.n7.xano.io/api:B0XRi_En/auth/me', {
          headers: { Authorization: `Bearer ${res.data.authToken}` }
        });
  
        if (userRes.data && userRes.data.email) {
          await redirectAccordingToRole(userRes.data.email);
        } else {
          alert('No se pudo obtener información de usuario');
        }
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    } catch (error: any) {
      alert('Error en la conexión o credenciales: ' + (error.response?.data?.message || error.message));
    } finally {
      isLoading.value = false;
    }
  }
  
  async function registerUser() {
    if (!registerUsername.value || !registerEmail.value || !registerPassword.value) {
      alert('Por favor, rellena todos los campos');
      return;
    }
    isLoading.value = true;
    try {
      const res = await axios.post('https://x8ki-letl-twmt.n7.xano.io/api:B0XRi_En/auth/signup', {
        name: registerUsername.value,
        email: registerEmail.value,
        password: registerPassword.value,
      });
  
      if (res.data && (res.data.token || res.data.authToken)) {
        saveSession(res.data.token || res.data.authToken);
        alert('Usuario registrado con éxito');
        showRegister.value = false;
        registerUsername.value = '';
        registerEmail.value = '';
        registerPassword.value = '';
        await redirectAccordingToRole(registerEmail.value);
      } else {
        alert('Error al registrar usuario');
      }
    } catch (error: any) {
      alert('Error al registrar usuario: ' + (error.response?.data?.message || error.message));
    } finally {
      isLoading.value = false;
    }
  }
  
  async function logout() {
    localStorage.removeItem('expiry-eyes-token');
    await router.push('/login');
  }
  
  onMounted(async () => {
    const token = getSession();
    if (token) {
      isLoading.value = true;
      try {
        const res = await axios.get('https://x8ki-letl-twmt.n7.xano.io/api:B0XRi_En/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data && res.data.email) {
          await redirectAccordingToRole(res.data.email);
        } else {
          localStorage.removeItem('expiry-eyes-token');
        }
      } catch {
        localStorage.removeItem('expiry-eyes-token');
      } finally {
        isLoading.value = false;
      }
    }
  });
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding-top: 10vh;
  }
  
  .logo {
    width: 120px;
    margin-bottom: 20px;
    margin-top: -20px;
  }
  
  ion-item {
    --border-radius: 10px;
    --box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 24px;
  }
  
  ion-label {
    margin-bottom: 4px;
    z-index: 1;
    position: relative;
    color: black; /* Ensure label text is visible */
  }

  ion-input {
    font-size: 16px;
    padding-top: 10px;
    color: black; /* Ensure text is visible */
    background-color: transparent; /* Make sure background does not cover label */
  }
  
  .login-button {
    margin-top: 24px;
    font-weight: bold;
    --box-shadow: 0 4px 12px rgba(0, 123, 255, 0.4);
  }
  </style>