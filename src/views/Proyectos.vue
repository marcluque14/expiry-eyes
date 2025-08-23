<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="success">
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/ayuntamientos" text="Atrás"></ion-back-button>
        </ion-buttons>
        <ion-title>Rexcatering</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="proyecto-container">
        <h2>Una iniciativa del Regidor de Acción Climática, Sergi Cot</h2>
        <p>
          Gracias a la colaboración con Rexcatering, los alimentos no consumidos en colegios se redirigen a una
          <strong>nevera solidaria</strong> donde cualquier persona puede acceder a productos de calidad por tan solo <strong>1€</strong>.
        </p>
        <img src="../assets/Rexcatering.png" alt="Nevera solidaria" class="proyecto-img" />
        <p>Una acción social que reduce el desperdicio alimentario y mejora el acceso a comida asequible.</p>
      </div>
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
  IonBackButton
} from '@ionic/vue';
</script>

<style scoped>
.proyecto-container {
  text-align: center;
  padding-top: 20px;
}

.proyecto-container h2 {
  font-size: 20px;
  color: #2e7d32;
  margin-bottom: 12px;
}

.proyecto-container p {
  font-size: 15px;
  margin: 10px auto;
  max-width: 90%;
}

.proyecto-img {
  width: 80%;
  max-width: 300px;
  margin: 20px auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
</style>
