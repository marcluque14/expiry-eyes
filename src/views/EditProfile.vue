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
          <div class="avatar-wrap">
            <img
              v-if="hasPhoto && (user.FotoPerfil?.url || user.FotoPerfil)"
              :src="user.FotoPerfil?.url || user.FotoPerfil"
              class="avatar"
              alt="User Avatar"
              @error="hasPhoto = false"
            />
            <div v-else class="avatar-fallback">{{ initials }}</div>
          </div>
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
        <IonItem class="location-item">
          <IonLabel position="stacked">Ubicació</IonLabel>
          <IonInput v-model="locationQuery" placeholder="Cerca ciutat..." @ionInput="onLocationInput" />
          <div v-if="showSuggestions && filteredCities.length" class="suggestions">
            <button class="suggestion" v-for="city in filteredCities" :key="city" @click="selectCity(city)">{{ city }}</button>
          </div>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Data de naixement</IonLabel>
          <IonInput v-model="user.Fecha_Nacimento" type="date" />
        </IonItem>       
      </ion-list>
      <IonButton expand="block" color="success" @click="saveProfile">Guardar canvis</IonButton>
      <IonLoading :is-open="loading || saving" message="Guardant..." spinner="crescent" />
      <IonToast :is-open="toastOpen" :message="toastMsg" :color="toastColor" duration="2000" position="top" @didDismiss="toastOpen=false" />
    </IonContent>
  </IonPage>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonInput, IonButton, IonItem, IonLabel, IonCard, IonLoading, IonToast } from '@ionic/vue';

const XANO_DATA_BASE = (import.meta.env.VITE_XANO_DATA_BASE || 'https://xqy3-nsl3-g9gf.n7e.xano.io/api:HWiWww8T')

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

const hasPhoto = ref(true)
const initials = computed(() => {
  const full = `${(user.value.name || '').trim()} ${(user.value.lastName || '').trim()}`.trim()
  if (!full) return '?'
  return full.charAt(0).toUpperCase()
})

const firstName = ref('');

const saving = ref(false)
const toastOpen = ref(false)
const toastMsg = ref('')
const toastColor = ref('success')

// --- Autocomplete Ubicació ---
const locationQuery = ref('')
const showSuggestions = ref(false)

// Lista base (puedes ampliar libremente)
// const allCities = [
//   'Barcelona','Girona','Tarragona','Lleida','Madrid','València','Sevilla','Saragossa','Bilbao','Màlaga',
//   'L’Hospitalet de Llobregat','Badalona','Sabadell','Terrassa','Mataró','Reus','Granollers','Manresa','Castelldefels','Sant Cugat del Vallès'
// ]

// const filteredCities = computed(() => {
//   const q = (locationQuery.value || '').toLowerCase().trim()
//   if (!q) return []
//   return allCities.filter(c => c.toLowerCase().includes(q)).slice(0, 8)
// })

const filteredCities = ref([])

function onLocationInput () {
  showSuggestions.value = true
}
function selectCity (city) {
  locationQuery.value = city
  user.value.Location = city
  showSuggestions.value = false
}

let cityDebounce
watch(locationQuery, (q) => {
  if (cityDebounce) clearTimeout(cityDebounce)
  const query = (q || '').trim()
  if (!query) {
    filteredCities.value = []
    showSuggestions.value = false
    return
  }
  cityDebounce = setTimeout(async () => {
    try {
      showSuggestions.value = true
      const token = localStorage.getItem('expiry-eyes-token')
      const headers = token && token !== 'null' ? { Authorization: `Bearer ${token}` } : {}
      const { data } = await axios.get(`${XANO_DATA_BASE}/geo/cities`, {
        params: { q: query, country: 'ES', maxRows: 8 },
        headers,
      })
      // Esperamos un array de strings; si devuelves un objeto {results: []}, adapta la lectura
      filteredCities.value = Array.isArray(data) ? data : (data.results || [])
    } catch (e) {
      console.error('Error buscant ciutats:', e)
      filteredCities.value = []
    }
  }, 250)
})

// Mantén sincronizado el query con el modelo real
watch(locationQuery, (v) => { user.value.Location = v || '' })

async function fetchUser() {
  loading.value = true;
  try {
    const token = localStorage.getItem('expiry-eyes-token');
    const headers = token && token !== 'null' ? { Authorization: `Bearer ${token}` } : {};
    const { data } = await axios.get(`https://xqy3-nsl3-g9gf.n7e.xano.io/api:HWiWww8T/user/${id}`, { headers });

    user.value.id = data.id || '';
    user.value.name = data.name || '';
    user.value.lastName = data.lastName || '';
    user.value.email = data.email || '';
    user.value.FotoPerfil = data.logo || null;
    user.value.Fecha_Nacimento = (data.Fecha_Nacimento ?? data.birthdate ?? '') || '';
    user.value.Location = (data.Location ?? data.location ?? '') || '';
    locationQuery.value = user.value.Location
    user.value.Telefono = (data.Telefono ?? data.phone ?? '') || '';
    user.value.language = data.language || '';
    user.value.theme = data.theme || '';
    user.value.role = data.role || '';
    firstName.value = data.name || '';
  } catch (e) {
    console.error('Error fetching user:', e);
    const status = e?.response?.status;
    if (status === 401) {
      // No redirigimos automáticamente; mostramos aviso
      toastColor.value = 'warning'
      toastMsg.value = 'Sessió expirada. Torna a iniciar sessió.'
      toastOpen.value = true
      // Opcional: permanecer en la página para no provocar salto al login
    }
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  if (id) fetchUser();
});

const saveProfile = async () => {
  saving.value = true
  try {
    const userId = user.value.id || id;
    const token = localStorage.getItem('expiry-eyes-token');
    const headers = token && token !== 'null' ? { Authorization: `Bearer ${token}` } : {};

    await axios.patch(
      `https://xqy3-nsl3-g9gf.n7e.xano.io/api:HWiWww8T/user/${userId}`,
      {
        name: user.value.name,
        lastName: user.value.lastName,
        email: user.value.email,
        Fecha_Nacimento: user.value.Fecha_Nacimento,
        Location: user.value.Location,
        Telefono: user.value.Telefono,
        role: user.value.role
      },
      { headers }
    );

    toastColor.value = 'success'
    toastMsg.value = 'Perfil guardat ✅'
    toastOpen.value = true

    // Ir al perfil; Profile.vue recarga datos con onIonViewWillEnter
    routerInstance.replace('/myProfilePage');
  } catch (error) {
    console.error('Error guardant el perfil:', error);
    const status = error?.response?.status;
    if (status === 401) {
      // Evita salto a login automático
      toastColor.value = 'warning'
      toastMsg.value = 'Sessió expirada. Inicia sessió per guardar canvis.'
      toastOpen.value = true
      // Si prefieres forzar el login, descomenta:
      // routerInstance.push('/login')
    } else {
      toastColor.value = 'danger'
      toastMsg.value = 'Error guardant el perfil. Revisa els camps.'
      toastOpen.value = true
    }
  } finally {
    saving.value = false
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
.avatar-wrap { width: 60px; height: 60px; position: relative; }
.avatar-fallback {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #1e66f5; /* primary-ish */
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 24px;
  text-transform: uppercase;
  box-shadow: 0 2px 6px rgba(0,0,0,0.18);
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

.location-item { position: relative; }
.suggestions {
  position: absolute;
  left: 16px; right: 16px;
  top: 100%;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.08);
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
  border-radius: 10px;
  padding: 6px;
  z-index: 5;
}
.suggestion {
  display: block;
  width: 100%;
  text-align: left;
  padding: 10px 12px;
  border: none;
  background: transparent;
  border-radius: 8px;
  font-size: 14px;
}
.suggestion:hover { background: #f6f7fb; }
</style>