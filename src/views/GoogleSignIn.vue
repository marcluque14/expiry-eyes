<template>
    <div id="g_id_signin"></div>
  </template>
  
  <script setup lang="ts">
  import { onMounted } from 'vue';
  
  const client_id = '376276619282-kc0kdb3ue0gajniggg9srd93q8i8vjah.apps.googleusercontent.com';
  
  onMounted(() => {
    // @ts-ignore
    google.accounts.id.initialize({
      client_id,
      callback: handleCredentialResponse,
    });
    // @ts-ignore
    google.accounts.id.renderButton(
      document.getElementById('g_id_signin'),
      { theme: 'outline', size: 'large' }  // personaliza el botón aquí
    );
  });
  
  function handleCredentialResponse(response: any) {
    console.log('Encoded JWT ID token: ' + response.credential);
    // Aquí puedes enviar el token JWT a tu backend para validar y loguear al usuario
  }
  </script>