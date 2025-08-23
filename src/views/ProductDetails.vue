<template>
  <ion-page>
    <ion-header collapse="condense">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button :default-href="'/tabs/home'" />
        </ion-buttons>
        <ion-title v-if="producto">{{ producto.NombreProducto }}</ion-title>
        <ion-title v-else>Producto</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div v-if="producto">
        <div class="image-container">
          <img :src="producto.ImagenProducto?.url" alt="Producto" />
        </div>

        <div class="details-card">
          <h1>{{ producto.NombreProducto }}</h1>
          <p class="description">{{ producto.DescripcionProducto || 'Sin descripción' }}</p>

          <div class="info-row">
            <span class="info-label">Unidad:</span>
            <span>{{ producto.Gramos || '—' }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Ingredientes:</span>
            <span>{{ producto.IngredientesProducto || '—' }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Stock:</span>
            <span>{{ producto.Cantidad || 0 }}</span>
          </div>

          <div class="quantity-price">
            <div class="quantity">
              <ion-button size="small" fill="outline" @click="decrease">-</ion-button>
              <span class="count">{{ cantidad }}</span>
              <ion-button size="small" fill="outline" @click="increase">+</ion-button>
            </div>
            <div class="price">{{ producto.Precio?.toFixed(2) }} €</div>
          </div>

          <ion-button expand="block" color="primary" class="add-button">
            Añadir al carrito
          </ion-button>
        </div>
      </div>
      <div v-else class="loading-message">
        Cargando producto...
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonBackButton } from '@ionic/vue'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import axios from 'axios'

const route = useRoute()
const producto = ref(null)
const cantidad = ref(1)

function increase() {
  cantidad.value++
}

function decrease() {
  if (cantidad.value > 1) cantidad.value--
}

onMounted(async () => {
  const id = route.params.product_id
  try {
    const res = await axios.get(`https://x8ki-letl-twmt.n7.xano.io/api:Frc5TgG-/productSingle/${id}`)
    producto.value = res.data
  } catch (error) {
    console.error('Error al cargar producto:', error)
  } 
})
</script>

<style scoped>
.image-container {
  position: relative;
  height: 250px;
  overflow: hidden;
  border-radius: 16px;
}
.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.back-button {
  position: absolute;
  top: 16px;
  left: 16px;
  background-color: rgba(255, 255, 255, 0.8);
  --border-radius: 50%;
}
.details-card {
  margin-top: 20px;
  background: #2c2c2c;
  border-radius: 20px;
  padding: 20px;
  color: #fff;
}
.details-card h1 {
  font-size: 22px;
  margin-bottom: 10px;
}
.description {
  font-size: 14px;
  margin-bottom: 10px;
  color: #ccc;
}
.info-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin: 4px 0;
}
.quantity-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;
}
.quantity {
  display: flex;
  align-items: center;
  gap: 8px;
}
.count {
  font-size: 16px;
  min-width: 24px;
  text-align: center;
}
.price {
  font-size: 20px;
  font-weight: bold;
  color: #00bfa6;
}
.add-button {
  margin-top: 20px;
}
</style>