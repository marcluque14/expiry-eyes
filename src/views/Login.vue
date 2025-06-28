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
              <ion-label position="floating">Username</ion-label>
              <ion-input type="text" v-model="username" autofocus></ion-input>
            </ion-item>
  
            <ion-item>
              <ion-label position="floating">Password</ion-label>
              <ion-input type="password" v-model="password"></ion-input>
            </ion-item>
          </ion-list>
  
          <ion-button expand="block" shape="round" class="login-button" @click="login">
            LOGIN
          </ion-button>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const username = ref('');
const password = ref('');
const router = useRouter();

async function login() {
  try {
    const res = await axios.get(
      `http://localhost:3000/users?username=${encodeURIComponent(username.value)}&password=${encodeURIComponent(password.value)}`
    );
    if (res.data.length > 0) {
      alert('Login correcto');
      router.push('/tabs/home');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  } catch (error) {
    console.error('Error al hacer login:', error);
    alert('Error en la conexión al servidor');
  }
}
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
    margin-bottom: 40px;
  }
  
  ion-item {
    --border-radius: 10px;
    --box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    margin-bottom: 16px;
  }
  
  ion-input {
    font-size: 16px;
  }
  
  .login-button {
    margin-top: 24px;
    font-weight: bold;
    --box-shadow: 0 4px 12px rgba(0,123,255,0.4);
  }
  </style>