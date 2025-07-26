<template>
  <div>Validando inicio de sesión con Google...</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  const code = route.query.code as string | undefined;
  console.log('Código recibido de Google:', code);

  if (!code) {
    alert('No se recibió código de Google. Intenta iniciar sesión otra vez.');
    router.push('/login');
    return;
  }

  try {
    const res = await axios.get('https://x8ki-letl-twmt.n7.xano.io/api:MPNZDU19/oauth/google/continue', {
      params: {
        code,
        redirect_uri: 'http://localhost:5173/oauth/google/callback'
      }
    });

    console.log('Respuesta de Xano:', res.data);

    // Corregimos aquí para que cheque 'token' (no authToken)
    if (res.data && res.data.token) {
      localStorage.setItem('expiry-eyes-token', res.data.token);
      router.push('/tabs/home');
    } else {
      alert('No se pudo validar el login con Google. Intenta otra vez.');
      router.push('/login');
    }
  } catch (error: any) {
  console.error('Error en validación login Google:', error);

  // Detecta el error USER_EXISTS
  const errMsg = error.response?.data?.error === 'USER_EXISTS'
    ? 'El usuario ya existe, por favor inicia sesión.'
    : (error.response?.data?.message || error.message);

  alert(errMsg);
  
  // Si el usuario ya existe, redirige a login
  if (error.response?.data?.error === 'USER_EXISTS') {
    router.push('/login');
  } else {
    router.push('/login');
  }
}
});
</script>