<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="success">
        <ion-title>Mapa de Ofertas</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-searchbar v-model="searchQuery" placeholder="Buscar población..." @ionChange="searchLocation"></ion-searchbar>
      <ul v-if="suggestions.length" class="suggestions-list">
        <li v-for="s in suggestions" :key="s.place_id" @click="selectSuggestion(s)">
          {{ s.description }}
        </li>
      </ul>
      <div id="map" style="height: 500px; width: 100%; margin-top: 10px;"></div>
      <ion-button expand="full" @click="goHome">Volver al Home</ion-button>
    </ion-content>
  </ion-page>
</template>
  
<script setup>
import { onMounted, ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonButton } from '@ionic/vue';
import { GoogleMap } from '@capacitor/google-maps';
import { getCurrentPosition } from '../api/geo';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

let map;
const lat = ref(41.3851);
const lng = ref(2.1734);
const searchQuery = ref('');
const suggestions = ref([]);

const goHome = () => {
  router.push('/tabs/home');
};

const searchLocation = async (event) => {
  const query = event.detail.value;
  if (!query) {
    suggestions.value = [];
    return;
  }

  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json`, {
      params: {
        input: query,
        key: 'AIzaSyCC25rkwfQNwz1Tbmx1EgzBqepKhbrSfXY'
      }
    });

    suggestions.value = response.data.predictions.map(pred => ({
      description: pred.description,
      place_id: pred.place_id
    }));
  } catch (error) {
    console.error('Error buscando sugerencias:', error);
  }
};

const selectSuggestion = async (suggestion) => {
  searchQuery.value = suggestion.description;
  suggestions.value = [];

  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
      params: {
        place_id: suggestion.place_id,
        key: 'AIzaSyCC25rkwfQNwz1Tbmx1EgzBqepKhbrSfXY'
      }
    });

    const location = response.data.results[0].geometry.location;

    await map.setCamera({
      coordinate: { lat: location.lat, lng: location.lng },
      zoom: 14
    });

    await map.addMarker({
      coordinate: { lat: location.lat, lng: location.lng },
      title: suggestion.description
    });
  } catch (error) {
    console.error('Error obteniendo detalles del lugar:', error);
  }
};

onMounted(async () => {
  const mapRef = document.getElementById('map');
  if (!mapRef) {
    console.error('Map div not found');
    return;
  }

  const pos = await getCurrentPosition();
  if (pos) {
    lat.value = pos.lat;
    lng.value = pos.lng;
  }

  map = await GoogleMap.create({
    id: 'expiry-native-map',
    element: mapRef,
    apiKey: 'AIzaSyCC25rkwfQNwz1Tbmx1EgzBqepKhbrSfXY',
    config: {
      center: { lat: lat.value, lng: lng.value },
      zoom: 14
    }
  });

  await map.addMarker({
    coordinate: { lat: lat.value, lng: lng.value },
    title: 'Tu ubicación'
  });
});
</script>
<style scoped>
.suggestions-list {
  position: absolute;
  background: #fff;
  border: 1px solid #ccc;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  margin: 0;
  padding: 0;
  list-style: none;
}
.suggestions-list li {
  padding: 8px 12px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  transition: background 0.2s;
}
.suggestions-list li:last-child {
  border-bottom: none;
}
.suggestions-list li:hover {
  background: #f0f0f0;
}
</style>