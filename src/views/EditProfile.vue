<template>
  <IonPage>
    <IonHeader>
      <IonToolbar color="primary">
        <IonButtons slot="start">
          <IonBackButton defaultHref="/myProfilePage" />
        </IonButtons>
        <IonTitle>Profile</IonTitle>
        <!-- Botó d'edició eliminat perquè ja estem a la vista d'edició -->
        <!-- <ion-button fill="clear" class="edit-button" @click="$router.push('/editprofile')">
          <IonIcon :icon="pencilOutline"></IonIcon>
        </ion-button> -->
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <ion-card class="profile-card" style="margin-top: 30px;">
        <div class="profile-row-box">
          <img :src="user.FotoPerfil?.url || user.FotoPerfil || defaultPhoto" class="avatar" alt="User Avatar" />
          <div class="profile-info">
            <h2>{{ user.name }} {{ user.lastName }}</h2>
            <p class="email">{{ user.email }}</p>
          </div>
        </div>
      </ion-card>

      <ion-list>
        <IonItem>
          <IonLabel position="stacked">Nom</IonLabel>
          <IonInput v-model="user.name" placeholder="Nom" />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Cognom</IonLabel>
          <IonInput v-model="user.lastName" placeholder="Cognom" />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Correu electrònic</IonLabel>
          <IonInput v-model="user.email" placeholder="Correu electrònic" :disabled="true" />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Telèfon</IonLabel>
          <IonInput v-model="user.Telefono" placeholder="Telèfon" />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Ubicació</IonLabel>
          <IonInput v-model="user.Location" placeholder="Ubicació" />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Data de naixement</IonLabel>
          <IonInput v-model="user.Fecha_Nacimento" type="date" />
        </IonItem>       
      </ion-list>
      <IonButton expand="block" color="success" @click="saveProfile">Guardar canvis</IonButton>
    </IonContent>
  </IonPage>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import router from '../router';
import axios from 'axios';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonInput, IonButton, IonIcon, IonItem, IonLabel, IonCard } from '@ionic/vue';
import { pencilOutline } from 'ionicons/icons';

const route = useRoute();
const routerInstance = useRouter();

const id = localStorage.getItem("user_id");

const user = ref({
  id: '',
  name: '',
  lastName: '',
  email: '',
  FotoPerfil: null,
  Fecha_Nacimento: '',
  Location: '',
  Telefono: '',
  language: '',
  theme: '',
  role: ''
});
const loading = ref(false);
const defaultPhoto = 'https://i.pravatar.cc/150?img=32';

const firstName = ref('');

async function fetchUser() {
  loading.value = true;
  try {
    const token = localStorage.getItem('expiry-eyes-token');
    if (!token || token === "null") {
      routerInstance.push("/login");
      return;
    }
    const headers = { Authorization: `Bearer ${token}` };
    const response = await fetch(`https://xqy3-nsl3-g9gf.n7e.xano.io/api:HWiWww8T/user/${id}`, {
      headers,
    });
    const data = await response.json();
    user.value.id = data.id || '';
    user.value.name = data.name || '';
    user.value.lastName = data.lastName || '';
    user.value.email = data.email || '';
    user.value.FotoPerfil = data.logo || null;
    user.value.Fecha_Nacimento = data.birthdate || '';
    user.value.Location = data.location || '';
    user.value.Telefono = data.phone || '';
    user.value.language = data.language || '';
    user.value.theme = data.theme || '';
    user.value.role = data.role || '';
    firstName.value = data.name || '';
  } catch (e) {
    console.error('Error fetching user:', e);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  const token = localStorage.getItem('expiry-eyes-token');
  if (!token || token === "null") {
    routerInstance.push("/login");
    return;
  }
  if (id) {
    fetchUser();
  }
});

const saveProfile = async () => {
  try {
    const userId = user.value.id || id;
    await axios.patch(`https://xqy3-nsl3-g9gf.n7e.xano.io/api:HWiWww8T/user/${userId}`, {
      name: user.value.name,
      lastName: user.value.lastName,
      email: user.value.email,
      Fecha_Nacimento: user.value.Fecha_Nacimento,
      Location: user.value.Location,
      Telefono: user.value.Telefono,
      role: user.value.role
    });
    console.log('Perfil actualitzat correctament');
    router.push('/myProfilePage');
    router.push('/tabs/home');
  } catch (error) {
    console.error('Error guardant el perfil:', error);
    alert('Error guardant el perfil. Revisa els camps.');
  }
};
</script>

<style scoped>
.profile-row-box {
  display: flex;
  align-items: center;
  border: 1.5px solid #d6895f;
  border-radius: 8px;
  padding: 8px 12px;
  margin-bottom: 24px;
  position: relative;
}
.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}
.profile-info {
  margin-left: 16px;
}
.profile-info h2 {
  margin: 0;
  font-weight: 600;
  font-size: 1.125rem;
}
.profile-info .email {
  margin: 4px 0 0 0;
  color: var(--ion-color-medium);
  font-size: 0.95rem;
}
ion-item {
  --inner-padding-end: 16px;
  --inner-padding-start: 16px;
  margin-bottom: 12px;
}
</style>