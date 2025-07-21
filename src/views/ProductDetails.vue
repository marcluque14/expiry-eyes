

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/home" @click="goBack"></ion-back-button>
        </ion-buttons>
        <ion-title>Canalones con bechamel</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- <h2>Canalones con bechamel</h2> -->
      <img src="@/assets/Canalones.jpeg" alt="Canalones" style="width: 100%; border-radius: 12px; margin-bottom: 15px;" />
      <ion-card>
        <ion-card-content>
          <p><strong>Precio:</strong> 3.90 €</p>
          <p><strong>Unidades disponibles:</strong> 7</p>
          <p><strong>Ingredientes:</strong> Pasta, carne picada, bechamel, queso rallado</p>
          <p><strong>Peso neto:</strong> 350g</p>
        </ion-card-content>
      </ion-card>
      <!-- Botón para abrir ubicación en Google Maps -->
      <IonButton
        expand="block"
        color="primary"
        @click="abrirUbicacion"
      >
        IR A BUSCARLO
      </IonButton>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { IonButton } from '@ionic/vue'

const router = useRouter()

const abrirUbicacion = () => {
  window.open(
    'https://www.google.com/maps/search/?api=1&query=Ptge.+Massaguer,+9,+17001+Girona',
    '_blank'
  );
};

function goBack() {
  router.replace('/tabs/home').then(() => {
    window.location.reload();
  });
}
</script>