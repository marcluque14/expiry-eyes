<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Productos próximos a caducar</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item v-for="p in products" :key="p.id">
            <ion-label>
              <h2>{{ p.name }}</h2>
              <p>Caduca: {{ p.expiry }} | {{ p.price }}€</p>
              <p>{{ p.supermarket }}</p>
            </ion-label>
            <ion-button @click="reserve(p.id)">Reservar</ion-button>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import productService from '../api/products';
  
  const products = ref([]);
  
  onMounted(async () => {
    products.value = await productService.getAll();
  });
  
  async function reserve(id) {
    const res = await productService.reserve(id);
    alert(res.message);
  }
  </script>