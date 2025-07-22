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
  
          <ion-list lines="none">
            <ion-item>
              <ion-label position="floating">Email</ion-label>
              <ion-input type="email" v-model="username" autofocus></ion-input>
            </ion-item>
  
            <ion-item>
              <ion-label position="floating">Password</ion-label>
              <ion-input type="password" v-model="password"></ion-input>
            </ion-item>
          </ion-list>
  
          <ion-button expand="block" shape="round" class="login-button" @click="login">
            Iniciar Sesión
          </ion-button>
  
          <ion-button expand="block" shape="round" color="tertiary" @click="showRegister = true">
            Crear Cuenta Nueva
          </ion-button>
  
          <!-- Aquí se renderiza el botón oficial de Google Sign-In -->
          <div id="googleSignInDiv" style="margin-top:15px;"></div>
  
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
              <ion-button expand="block" @click="registerUser">Registrar</ion-button>
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
  const router = useRouter();
  
  async function login() {
    try {
      const res = await axios.post('https://x8ki-letl-twmt.n7.xano.io/api:2QD5Pvn-/auth/login', {
        email: username.value,
        password: password.value,
      });
      if (res.data && res.data.user) {
        alert('Login correcto');
        if (res.data.user.role === 'cliente1' || res.data.user.username === 'cliente1') {
          router.push('/home-empresa');
        } else {
          router.push('/tabs/home');
        }
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al hacer login:', error);
      alert('Error en la conexión al servidor');
    }
  }
  
  async function registerUser() {
    try {
      const res = await axios.post('https://x8ki-letl-twmt.n7.xano.io/api:2QD5Pvn-/auth/signup', {
        name: registerUsername.value,
        email: registerEmail.value,
        password: registerPassword.value,
      });
      if (res.data && res.data.user) {
        alert('Usuario registrado con éxito');
        showRegister.value = false;
        registerUsername.value = '';
        registerEmail.value = '';
        registerPassword.value = '';
      } else {
        alert('Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error en registro:', error);
      alert('Error en la conexión al servidor');
    }
  }
  
  function handleCredentialResponse(response: { credential: string }) {
    console.log('Token Google JWT:', response.credential); // Muestra el token en consola
    axios.get('https://x8ki-letl-twmt.n7.xano.io/oauth/google/continue', {
      params: { token: response.credential }
    }).then(res => {
      if (res.data && res.data.user) {
        alert('Login Google correcto');
        if (res.data.user.role === 'cliente1') {
          router.push('/home-empresa');
        } else {
          router.push('/tabs/home');
        }
      } else {
        alert('Login con Google fallido');
      }
    }).catch(() => alert('Error en login con Google'));
  }
  
  const initializeGoogleSignIn = () => {
    // @ts-ignore
    window.google.accounts.id.initialize({
      client_id: '376276619282-quj730ud2a8f97oiak353po09en45cgn.apps.googleusercontent.com',
      callback: handleCredentialResponse,
    });
    // @ts-ignore
    window.google.accounts.id.renderButton(
      document.getElementById('googleSignInDiv'),
      { theme: 'outline', size: 'large' }
    );
  };
  
  onMounted(() => {
    const script = document.createElement('script');
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    script.onload = () => initializeGoogleSignIn();
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
    --box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    margin-bottom: 24px;
  }
  
  ion-label {
    margin-bottom: 4px;
  }
  
  ion-input {
    font-size: 16px;
    padding-top: 10px;
  }
  
  .login-button {
    margin-top: 24px;
    font-weight: bold;
    --box-shadow: 0 4px 12px rgba(0,123,255,0.4);
  }
  </style>