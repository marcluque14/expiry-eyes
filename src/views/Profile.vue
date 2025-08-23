<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/home" />
        </ion-buttons>
        <ion-title>👤 Mi perfil</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <div class="profile-header">
        <div class="avatar-wrapper">
          <img
            v-if="user.logo"
            class="avatar"
            :src="user.logo"
            alt="User Avatar"
            @error="user.logo = ''"
          />
          <div v-else class="avatar initials">
            {{ firstName.charAt(0) }}
          </div>
        </div>
        <h2>{{ user.name || 'Usuari' }}</h2>
        <p class="email">✉️ {{ user.email }}</p>
        <span class="chip" v-if="user.Location">📍 {{ user.Location }}</span>
      </div>

      <div class="info-card">
        <ion-item lines="none">
          <ion-label>
            🧑‍💼 Nom
            <p>{{ firstName || '—' }}</p>
          </ion-label>
        </ion-item>
        <ion-item lines="none">
          <ion-label>
            👤 Cognom
            <p>{{ user.lastName || '—' }}</p>
          </ion-label>
        </ion-item>
        <ion-item lines="none">
          <ion-label>
            ✉️ Correu electrònic
            <p>{{ user.email || '—' }}</p>
          </ion-label>
        </ion-item>
        <ion-item lines="none">
          <ion-label>
            📞 Telèfon
            <p>{{ user.Telefono || '—' }}</p>
          </ion-label>
        </ion-item>
        <ion-item lines="none">
          <ion-label>
            📍 Ubicació
            <p>{{ user.Location || '—' }}</p>
          </ion-label>
        </ion-item>
        <ion-item lines="none">
          <ion-label>
            🎂 Data de naixement
            <p>{{ user.Fecha_Nacimento || '—' }}</p>
          </ion-label>
        </ion-item>
      </div>

      <ion-button expand="block" shape="round" color="primary" @click="goToEditProfile">
        ✏️ Editar perfil
      </ion-button>

    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from 'vue-router'
import { onIonViewWillEnter } from '@ionic/vue'

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

async function loadProfile() {
  if (!userId) {
    console.warn("user_id no trobat al localStorage");
    return;
  }
  try {
    const res = await axios.get(
      `https://xqy3-nsl3-g9gf.n7e.xano.io/api:HWiWww8T/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    user.value = res.data || {};

    if (res.data?.FotoPerfil?.path) {
      user.value.logo = `https://xqy3-nsl3-g9gf.n7e.xano.io${res.data.FotoPerfil.path}`;
    }

    const parts = res.data?.name?.split(" ") || [];
    firstName.value = parts[0] || "";

    if (!user.value.email) user.value.email = "";
  } catch (error) {
    console.error("Error cargando el perfil:", error);
  }
}

onMounted(loadProfile)
onIonViewWillEnter(loadProfile)
</script>

<style scoped>
.profile-header {
  text-align: center;
  margin-bottom: 20px;
}

.avatar-wrapper {
  width: 110px;
  height: 110px;
  margin: 0 auto 10px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #3b82f6;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e5e7eb;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar.initials {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 36px;
  font-weight: 700;
  color: #3b82f6;
}

.email {
  color: gray;
  font-size: 14px;
  margin: 5px 0 10px;
}

.info-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0px 2px 10px rgba(0,0,0,0.05);
  padding: 10px;
  margin-bottom: 20px;
}

ion-item {
  --inner-padding-end: 0;
  --padding-start: 0;
  --min-height: 48px;
}

ion-label p {
  margin: 2px 0 0;
  font-weight: bold;
  color: #111;
}

.chip {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  background: #eef4ff;
  color: #2b5fb8;
  border: 1px solid rgba(43,95,184,0.15);
  font-size: 12px;
}
</style>