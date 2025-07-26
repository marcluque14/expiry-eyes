<template>
    <ion-page>
      <ion-content class="ion-padding">
        Autenticando con Google...
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  
  const route = useRoute();
  const router = useRouter();
  
  onMounted(() => {
    // Capturamos el token enviado por Xano tras login con Google
    const token = route.query.token || route.query.authToken;
  
    if (token) {
      // Guardamos token en localStorage para mantener sesión iniciada
      localStorage.setItem('expiry-eyes-token', token as string);
      // Redirigimos al home o donde desees tras login
      router.push('/tabs/home');
    } else {
      alert('Error al iniciar sesión con Google');
      router.push('/login');
    }
  });
  </script>