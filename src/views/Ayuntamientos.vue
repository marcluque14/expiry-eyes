<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="success">
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/home" text="Atrás"></ion-back-button>
        </ion-buttons>
        <ion-title>Ayuntamiento de Girona</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="ayto-header">
        <img src="../assets/ayuntamiento.png" alt="Ayuntamiento Girona" class="ayto-logo" />
        <h2>Colaboración con el Ayuntamiento de Girona</h2>
        <p>Promovemos juntos una gestión sostenible y responsable de los alimentos.</p>
      </div>

      <div class="ayto-grid">
        <div class="ayto-card" @click="$router.push('/proyectos')" style="cursor: pointer;">
          <ion-icon :icon="checkmarkCircleOutline" class="ayto-icon" />
          <h3>Iniciativas Sociales</h3>
          <p>Proyectos conjuntos para beneficiar a colectivos vulnerables.</p>
        </div>
        <div class="ayto-card" @click="$router.push('/impacto')" style="cursor: pointer;">
          <ion-icon :icon="leafOutline" class="ayto-icon" />
          <h3>Impacto Medioambiental</h3>
          <p>Reducción del desperdicio y emisiones con puntos de recogida.</p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonButtons,
  IonBackButton
} from '@ionic/vue';
import { checkmarkCircleOutline, leafOutline } from 'ionicons/icons';
</script>

<style scoped>
.ayto-header {
  text-align: center;
  padding: 20px;
}

.ayto-logo {
  width: 80px;
  margin-bottom: 12px;
}

.ayto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-top: 20px;
}

.ayto-card {
  background-color: #ffffff;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  text-align: center;
  font-size: 14px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.ayto-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 6px 16px rgba(0,0,0,0.15);
}

.ayto-icon {
  font-size: 32px;
  color: #2e7d32;
  margin-bottom: 8px;
}

.ayto-card h3 {
  font-size: 16px;
  margin-bottom: 8px;
}

.ayto-card p {
  font-size: 13px;
  line-height: 1.4;
}
</style>