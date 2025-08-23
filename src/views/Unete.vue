<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="success">
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/home" text="Atrás"></ion-back-button>
        </ion-buttons>
        <ion-title>Únete a la causa</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="unete-header">
        <h2>¿Tienes un comercio?</h2>
        <p>Únete a ExpiryEyes y ayúdanos a reducir el desperdicio alimentario 🌍</p>
      </div>

      <form class="unete-form">
        <ion-item>
          <ion-input v-model="nombre" label="Nombre del comercio" label-placement="floating" type="text" required></ion-input>
        </ion-item>

        <ion-item>
          <ion-input v-model="contacto" label="Persona de contacto" label-placement="floating" type="text" required></ion-input>
        </ion-item>

        <ion-item>
          <ion-input v-model="email" label="Correo electrónico" label-placement="floating" type="email" required></ion-input>
        </ion-item>

        <ion-item>
          <ion-input v-model="telefono" label="Teléfono" label-placement="floating" type="tel"></ion-input>
        </ion-item>

        <ion-item>
          <ion-input v-model="ciudad" label="Ciudad / Localidad" label-placement="floating" type="text"></ion-input>
        </ion-item>


        <ion-button
          expand="block"
          color="success"
          class="unete-submit"
          @click.prevent="enviarSolicitud"
          :disabled="isSending"
        >
          <ion-spinner v-if="isSending" name="dots" slot="start"></ion-spinner>
          {{ isSending ? 'Enviando...' : 'Enviar solicitud 🌱' }}
        </ion-button>
      </form>
      <IonToast
        :is-open="showToast"
        message="¡Gracias por unirte a la causa!"
        duration="3000"
        color="success"
        @didDismiss="showToast = false"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonToast,
  IonSpinner
} from '@ionic/vue';

import { ref } from 'vue';

const nombre = ref('');
const contacto = ref('');
const email = ref('');
const telefono = ref('');
const ciudad = ref('');
const showToast = ref(false);
const isSending = ref(false);

function iniciarSesionConGmail() {
  const clientId = '376276619282-vo1t6gpds6vk5h4svudabp9ooadn8f2t.apps.googleusercontent.com';
  const redirectUri = 'http://localhost:5173';
  const scope = 'https://www.googleapis.com/auth/gmail.send';

  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}`;
  window.location.href = url;
}

if (window.location.hash.includes('access_token')) {
  const token = new URLSearchParams(window.location.hash.substring(1)).get('access_token');
  if (token) {
    localStorage.setItem('gmail_token', token);
    window.location.hash = '';
  }
}

async function enviarSolicitud() {
  isSending.value = true;

  try {
    const payload = {
      nombre_comercio: nombre.value,
      persona_contacto: contacto.value,
      email: email.value,
      ciudad: ciudad.value,
      telefono: telefono.value
    };

    console.log('Payload enviado:', payload);

    const response = await fetch('https://xqy3-nsl3-g9gf.n7e.xano.io/api:oqFBhmrp/mail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ input: payload })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    nombre.value = '';
    contacto.value = '';
    email.value = '';
    telefono.value = '';
    ciudad.value = '';
    showToast.value = true;
  } catch (err) {
    console.error('Error al enviar:', err);
    alert('No se pudo enviar el correo. Consulta la consola.');
  } finally {
    isSending.value = false;
  }
}
</script>

<style scoped>
.unete-header {
  text-align: center;
  margin-bottom: 20px;
}

.unete-header h2 {
  color: #2e7d32;
}

.unete-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 500px;
  margin: 0 auto;
}

.unete-submit {
  margin-top: 20px;
}
</style>