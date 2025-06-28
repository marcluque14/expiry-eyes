<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Mi Perfil</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="profile-header">
        <img class="avatar" src="https://i.pravatar.cc/150?img=3" alt="User Avatar" />
        <h2>{{ username }}</h2>
        <p class="email">{{ email }}</p>
      </div>

      <ion-list>
        <ion-item button @click="goToSettings">
          <ion-label>Configuración</ion-label>
        </ion-item>
        <ion-item button @click="goToHelp">
          <ion-label>Ayuda</ion-label>
        </ion-item>
        <ion-item button color="danger" @click="logout">
          <ion-label>Cerrar sesión</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from '@ionic/vue';

const username = ref('Marc Expiry Eyes');
const email = ref('marc@expiryeyes.com');
const router = useRouter();

function logout() {
  alert('Sesión cerrada');
  router.push('/login');
}

function goToSettings() {
  alert('Ir a configuración (pendiente)');
}

function goToHelp() {
  alert('Ir a ayuda (pendiente)');
}
</script>

<style scoped>
.profile-header {
  text-align: center;
  margin-bottom: 20px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 10px auto;
  display: block;
}

.email {
  color: gray;
  font-size: 14px;
}
</style>