<template>
    <ion-page>
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/tabs/home"></ion-back-button>
          </ion-buttons>
          <ion-title>Mi Perfil</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
        <div class="profile-header">
          <img
            class="avatar"
            src="https://i.pravatar.cc/150?img=3"
            alt="User Avatar"
          />
          <h2>{{ username }}</h2>
          <p class="email">{{ email }}</p>
          <ion-button fill="clear" size="small" color="primary" @click="editProfile">
            Editar Perfil
          </ion-button>
        </div>
  
        <ion-list>
          <ion-list-header>Cuenta y preferencias</ion-list-header>
          <ion-item button @click="goToPaymentMethods">
            <ion-label>Métodos de Pago</ion-label>
            <ion-note slot="end">2 Tarjetas</ion-note>
          </ion-item>
          <ion-item button @click="goToOrderHistory">
            <ion-label>Historial de pedidos</ion-label>
          </ion-item>
          <ion-item button @click="goToFavorites">
            <ion-label>Favoritos</ion-label>
            <ion-note slot="end">3</ion-note>
          </ion-item>
          <ion-item button @click="goToReservations">
            <ion-label>Mis Reservas</ion-label>
            <ion-note slot="end">1 activa</ion-note>
          </ion-item>
  
          <ion-list-header>Configuración de la App</ion-list-header>
          <ion-item button @click="goToNotifications">
            <ion-label>Notificaciones</ion-label>
            <ion-note slot="end">On</ion-note>
          </ion-item>
          <ion-item button @click="goToLocationSettings">
            <ion-label>Configuración de Localización</ion-label>
          </ion-item>
          <ion-item button @click="goToLanguageSettings">
            <ion-label>Idioma</ion-label>
            <ion-note slot="end">Español</ion-note>
          </ion-item>
          <ion-item button @click="goToThemeSettings">
            <ion-label>Tema</ion-label>
            <ion-note slot="end">Light</ion-note>
          </ion-item>
  
          <ion-list-header>Soporte & Legal</ion-list-header>
          <ion-item button @click="goToInviteFriend">
            <ion-label>Invita a un amigo</ion-label>
          </ion-item>
          <ion-item button @click="goToPrivacyPolicy">
            <ion-label>Política de Privacidad</ion-label>
          </ion-item>
  
          <ion-list-header color="light">Acciones de Cuenta</ion-list-header>
          <ion-item button color="white" @click="logout">
            <ion-label color="danger">Cerrar sesión</ion-label>
          </ion-item>
          <ion-item button @click="deleteAccount">
            <ion-label color="danger">Eliminar Cuenta</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  
  const username = ref("Marc Expiry Eyes");
  const email = ref("marc@expiryeyes.com");
  const router = useRouter();
  
  function logout() {
    // Aquí puedes limpiar datos locales o tokens si usas autenticación real
    alert("Sesión cerrada");
    router.push("/login");
  }
  
  function editProfile() {
    // Navegar o abrir modal para editar perfil
    alert("Ir a editar perfil (pendiente)");
  }
  
  function goToPaymentMethods() {
  router.push('/payment-methods');
}
  
  function goToOrderHistory() {
    router.push("/order-history"); // Define esta ruta y página
  }
  
  function goToFavorites() {
    router.push("/favorites"); // Define esta ruta y página
  }
  
  function goToReservations() {
    router.push("/reservations"); // Define esta ruta y página
  }
  
  function goToNotifications() {
    router.push("/notifications"); // Define esta ruta y página
  }
  
  function goToLocationSettings() {
    router.push("/location-settings"); // Define esta ruta y página
  }
  
  function goToLanguageSettings() {
    router.push("/language-settings"); // Define esta ruta y página
  }
  
  function goToThemeSettings() {
    router.push("/theme-settings"); // Define esta ruta y página
  }
  
  function goToInviteFriend() {
    alert("Invitar a un amigo (pendiente)");
  }
  
  function goToPrivacyPolicy() {
    router.push("/privacy-policy"); // Define esta ruta y página
  }
  
  function deleteAccount() {
    alert("Eliminar cuenta (pendiente)");
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