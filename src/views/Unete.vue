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

async function enviarSolicitud() {
  isSending.value = true;
  try {
    const response = await fetch('https://xqy3-nsl3-g9gf.n7e.xano.io/api:oqFBhmrp/mail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre_comercio: nombre.value,
        persona_contacto: contacto.value,
        email: email.value,
        telefono: telefono.value, // afegit
        ciudad: ciudad.value
      })
    });

    if (!response.ok) throw new Error('Error al enviar');

    // Limpiar campos
    nombre.value = '';
    contacto.value = '';
    email.value = '';
    telefono.value = ''; // afegit
    ciudad.value = '';

    showToast.value = true;
  } catch (error) {
    console.error('Error al enviar solicitud:', error);
    alert('Ha ocurrido un error al enviar la solicitud.');
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