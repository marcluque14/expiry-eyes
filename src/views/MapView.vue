<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Mapa de Supermercados</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <div id="map" style="height: 100vh;"></div>
        <ion-button expand="full" @click="router.push('/tabs/home')">Ir a Home</ion-button>
      </ion-content>
    </ion-page>
</template>
  
<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { GoogleMap } from '@capacitor/google-maps';
import { getCurrentPosition } from '../api/geo';
import { useRouter } from 'vue-router';
const router = useRouter();

let map;
const lat = ref(41.3851);
const lng = ref(2.1734);

onMounted(async () => {
  // Obtener ubicación actual
  const pos = await getCurrentPosition();
  if (pos) {
    lat.value = pos.lat;
    lng.value = pos.lng;
  }

  // Crear mapa
  const mapRef = document.getElementById('map');
  map = await GoogleMap.create({
    id: 'expiry-map',
    element: mapRef,
    apiKey: 'AIzaSyCC25rkwfQNwz1Tbmx1EgzBqepKhbrSfXY',
    config: {
      center: { lat: lat.value, lng: lng.value },
      zoom: 15
    }
  });

  // Añadir marcador de tu ubicación
  await map.addMarker({
    coordinate: { lat: lat.value, lng: lng.value },
    title: 'Tu ubicación'
  });

  // Obtener supermercados desde mock API
  try {
    const response = await axios.get('http://localhost:3000/supermarkets');
    const supermarkets = response.data;

    // Añadir marcador por cada supermercado
    for (const market of supermarkets) {
      await map.addMarker({
        coordinate: { lat: market.lat, lng: market.lng },
        title: market.name
      });
    }
  } catch (error) {
    console.error('Error cargando supermercados:', error);
  }
});
</script>