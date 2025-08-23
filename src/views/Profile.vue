<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/home" />
        </ion-buttons>
        <ion-title>Mi perfil</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="goToEditProfile">
            <ion-icon slot="icon-only" :icon="pencilOutline" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      
      <div class="profile-header">
        <img
          class="avatar"
          :src="user.logo || 'https://i.pravatar.cc/150?img=3'"
          alt="User Avatar"
        />
        <h2>{{ user.name }}</h2>
        <p class="email">{{ user.email }}</p>
      </div>

      <ion-item>
        <ion-label>Nom</ion-label>
        <div>{{ firstName }}</div>
      </ion-item>
      <ion-item>
        <ion-label>Cognom</ion-label>
        <div>{{ user.lastName }}</div>
      </ion-item>
      <ion-item>
        <ion-label>Correu electrònic</ion-label>
        <div>{{ user.email }}</div>
      </ion-item>
      <ion-item>
        <ion-label>Telèfon</ion-label>
        <div>{{ user.Telefono }}</div>
      </ion-item>
      <ion-item>
        <ion-label>Ubicació</ion-label>
        <div>{{ user.Location }}</div>
      </ion-item>
      <ion-item>
        <ion-label>Data de naixement</ion-label>
        <div>{{ user.Fecha_Nacimento }}</div>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { pencilOutline } from 'ionicons/icons'
import { useRouter } from 'vue-router'
import { IonIcon } from '@ionic/vue';

const user = ref({});
const firstName = ref("");

const router = useRouter()

function goToEditProfile() {
  router.push('/editprofile')
}

// Obtenir user_id i token del localStorage (ajusta si uses pinia o altres)
const token = localStorage.getItem("expiry-eyes-token");
const rawId = localStorage.getItem("user_id");
const userId = rawId && rawId !== "null" ? rawId : null;

onMounted(async () => {
  if (!userId) {
    console.warn("user_id no trobat al localStorage");
    return;
  }
  try {
    const res = await axios.get(
      `https://xqy3-nsl3-g9gf.n7e.xano.io/api:HWiWww8T/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // comenta aquesta línia si no tens auth
        },
      }
    );
    user.value = res.data;

    if (res.data.FotoPerfil?.path) {
      user.value.logo = `https://xqy3-nsl3-g9gf.n7e.xano.io${res.data.FotoPerfil.path}`;
    }

    // Separa nom i cognom (si vols mostrar-los per separat)
    const parts = res.data.name?.split(" ");
    firstName.value = parts?.[0] || "";

    // Assegura que user.value.email estigui inicialitzat correctament
    if (!user.value.email) {
      user.value.email = "";
    }
  } catch (error) {
    console.error("Error cargando el perfil:", error);
  }
});
</script>

<style scoped>
.profile-header {
  position: relative;
  text-align: center;
  margin-bottom: 30px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 10px auto;
  display: block;
  object-fit: cover;
}

.email {
  color: gray;
  font-size: 14px;
  margin-bottom: 10px;
}

ion-item {
  --padding-start: 16px;
  --inner-padding-end: 16px;
  margin-bottom: 12px;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-card {
  background: #fff;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
}

.form-card label {
  font-size: 12px;
  color: gray;
}

.form-card p {
  font-size: 16px;
  font-weight: bold;
  margin: 5px 0 0;
}
</style>