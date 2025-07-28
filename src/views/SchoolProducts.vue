<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/home" />
        </ion-buttons>
        <ion-title>{{ colegioName }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div v-if="!products.length && !isLoading">
        <p>No hay productos disponibles para este colegio.</p>
      </div>
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :id="product.id"
        :logo="product.logo || ''"
        :name="product.NombreProducto"
        :expires="product.FechaCreacion"
        :price="product.Precio"
        :discount="product.discount"
        :image="product.ImagenProducto?.url || ''"
        :cantidad="product.Cantidad"
        :gramos="product.Gramos"
      />
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton
} from '@ionic/vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import ProductCard from '@/components/ProductCard.vue'

const route = useRoute()
const colegioName = ref(route.params.colegio)
const products = ref([])
const isLoading = ref(true)

onMounted(async () => {
  try {
    const res = await axios.get(`https://x8ki-letl-twmt.n7.xano.io/api:Frc5TgG-/productos?Escuela=${encodeURIComponent(colegioName.value)}`)
    products.value = res.data.filter(p =>
      p && p.NombreProducto && p.Precio !== null && p.ImagenProducto?.url
    )
  } catch (error) {
    console.error('Error al cargar productos del colegio:', error)
  } finally {
    isLoading.value = false
  }
})
</script>
<style scoped>
ion-page {
  background: linear-gradient(to bottom, #1e1e1e, #2c2c2c);
  color: #d1d1d1;
}
</style>