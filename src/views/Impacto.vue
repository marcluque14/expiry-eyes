<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="success">
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/ayuntamientos" text="Atrás"></ion-back-button>
        </ion-buttons>
        <ion-title>Impacto Medioambiental</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="impacto-container">
        <img src="../assets/sostenibilidad.png" alt="CO2" class="impacto-icon" />
        <h2>Seguimiento de tu huella de CO₂</h2>
        <p>Cada producto salvado evita la emisión de gases contaminantes y reduce el desperdicio alimentario.</p>
        <div class="impacto-card">
          <h3>🥬 1 producto salvado</h3>
          <p>≃ 2.5 kg CO₂ evitados</p>
        </div>
        <div class="impacto-card">
          <h3>♻️ Total acumulado</h3>
          <p>≃ 56 kg CO₂ salvados</p>
        </div>
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
.impacto-container {
  text-align: center;
  padding-top: 16px;
}

.impacto-icon {
  width: 80px;
  margin-bottom: 16px;
}

.impacto-card {
  background: #e0f8dc;
  margin: 12px auto;
  padding: 16px;
  border-radius: 12px;
  max-width: 280px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  font-weight: 500;
}
</style>
