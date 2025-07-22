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
        <ion-button fill="clear" size="small" color="primary">Editar Perfil</ion-button>
      </div>

      <ion-list>
        <ion-list-header>Cuenta y preferencias</ion-list-header>
        <ion-item button>
          <ion-label>Métodos de Pago</ion-label>
          <ion-note slot="end">2 Tarjetas</ion-note>
        </ion-item>
        <ion-item button>
          <ion-label>Historial de pedidos</ion-label>
        </ion-item>
        <ion-item button>
          <ion-label>Favoritos</ion-label>
          <ion-note slot="end">3</ion-note>
        </ion-item>
        <ion-item button>
          <ion-label>Mis Reservas</ion-label>
          <ion-note slot="end">1 activa</ion-note>
        </ion-item>

        <ion-list-header>Configuración de la App</ion-list-header>
        <ion-item button>
          <ion-label>Notificaciones</ion-label>
          <ion-note slot="end">On</ion-note>
        </ion-item>
        <ion-item button>
          <ion-label>Configuración de Localización</ion-label>
        </ion-item>
        <ion-item button>
          <ion-label>Idioma</ion-label>
          <ion-note slot="end">Español</ion-note>
        </ion-item>
        <ion-item button>
          <ion-label>Tema</ion-label>
          <ion-note slot="end">Light</ion-note>
        </ion-item>

        <ion-list-header>Soporte & Legal</ion-list-header>
        <ion-item button>
          <ion-label>Invita a un amigo</ion-label>
        </ion-item>
        <ion-item button>
          <ion-label>Política de Privacidad</ion-label>
        </ion-item>

        <ion-list-header color="light">Acciones de Cuenta</ion-list-header>
        <ion-item button color="white" @click="logout">
          <ion-label color="danger">Cerrar sesión</ion-label>
        </ion-item>
        <ion-item button>
          <ion-label color="danger">Eliminar Cuenta</ion-label>
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