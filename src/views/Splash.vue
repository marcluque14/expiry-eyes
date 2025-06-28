<template>
  <ion-page class="splash-page">
    <ion-content :fullscreen="true" class="splash-content">
      <div class="splash-container">
        <img v-if="!showLogo" src="../assets/bolsa.png" alt="Bolsa con comida" class="falling-bag" />
        <img v-if="showLogo" src="../assets/logo.png" alt="Expiry Eyes Logo" class="center-logo" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const showLogo = ref(false);

onMounted(() => {
  setTimeout(() => {
    showLogo.value = true;
  }, 2000); // Show logo after bag animation

  setTimeout(() => {
    router.push('/login');
  }, 4000); // Redirect after total 4s
});
</script>

<style scoped>
.splash-content {
  --background: #4CAF50; /* ecological green */
}

.splash-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.falling-bag {
  width: 120px;
  animation: fall 2s ease-in forwards;
}

@keyframes fall {
  from {
    transform: translateY(-150%);
  }
  to {
    transform: translateY(70vh);
  }
}

.center-logo {
  width: 150px;
  margin-top: 40vh;
  animation: fadeIn 1s ease-in forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>