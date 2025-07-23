<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Panel del Supermercado</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="logout" color="danger" size="small">Logout</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-button expand="block" @click="toggleForm" style="margin-bottom: 10px;">
        {{ showForm ? 'OCULTAR FORMULARIO' : 'NUEVO PRODUCTO' }}
      </ion-button>

      <ion-button expand="block" @click="toggleProductos" style="margin-bottom: 20px;">
        {{ showProductos ? 'OCULTAR PRODUCTOS' : 'VER PRODUCTOS' }}
      </ion-button>

      <div v-if="showForm" class="form-container">
        <ion-input v-model="nuevoProducto.NombreProducto" label="Nombre" label-placement="floating" fill="outline"></ion-input>
        <ion-input v-model="nuevoProducto.Cantidad" type="number" label="Cantidad" label-placement="floating" fill="outline"></ion-input>
        <ion-input v-model="nuevoProducto.Gramos" label="Gramos" label-placement="floating" fill="outline"></ion-input>
        <ion-input v-model="nuevoProducto.DescripcionProducto" label="Descripción" label-placement="floating" fill="outline"></ion-input>
        <ion-input v-model="nuevoProducto.Ingredientes" label="Ingredientes" label-placement="floating" fill="outline"></ion-input>
        <ion-input v-model="nuevoProducto.Precio" type="number" label="Precio" label-placement="floating" fill="outline"></ion-input>
        <ion-select v-model="nuevoProducto.Escuela" label="Colegio" fill="outline" interface="popover">
          <ion-select-option value="Salle">Salle</ion-select-option>
          <ion-select-option value="Bresol">Bresol</ion-select-option>
        </ion-select>
        <ion-input v-model="nuevoProducto.ImagenProducto" label="Imagen (URL)" label-placement="floating" fill="outline"></ion-input>
        <ion-button expand="block" @click="guardarProducto" style="margin-top: 15px;">
          GUARDAR PRODUCTO
        </ion-button>
      </div>

      <div v-if="showProductos && productos.length > 0" class="productos-list">
        <ion-list>
          <ion-card v-for="producto in productos" :key="producto.id" class="producto-card">
            <ion-card-header>
              <ion-card-title>{{ producto.NombreProducto }}</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <p><strong>Cantidad:</strong> {{ producto.Cantidad }}</p>
              <p><strong>Gramos:</strong> {{ producto.Gramos }}</p>
              <p><strong>Precio:</strong> €{{ producto.Precio }}</p>
              <p><strong>Ingredientes:</strong> {{ producto.IngredientesProducto }}</p>
              <p><strong>Descripción:</strong> {{ producto.DescripcionProducto }}</p>
              <p><strong>Colegio:</strong> {{ producto.Escuela }}</p>
            </ion-card-content>
          </ion-card>
        </ion-list>
      </div>

      <ion-toast
        :is-open="showToast"
        message="Producto guardado correctamente"
        duration="2000"
        @didDismiss="showToast = false"
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
  IonButton,
  IonInput,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSelect,
  IonSelectOption,
  IonToast,
  IonButtons
} from '@ionic/vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const showForm = ref(false)
const showProductos = ref(false)
const productos = ref([])
const nuevoProducto = ref({
  NombreProducto: '',
  Cantidad: 0,
  Gramos: '',
  DescripcionProducto: '',
  Ingredientes: '',
  Precio: 0,
  Escuela: '',
  ImagenProducto: ''
})

const showToast = ref(false)

const router = useRouter()

const toggleForm = () => {
  showForm.value = !showForm.value
}

const toggleProductos = async () => {
  showProductos.value = !showProductos.value
  if (showProductos.value) {
    await fetchProductos()
  }
}

const fetchProductos = async () => {
  try {
    const res = await axios.get('https://x8ki-letl-twmt.n7.xano.io/api:Frc5TgG-/productos')
    productos.value = res.data.reverse();
  } catch (error) {
    console.error('Error al obtener productos:', error)
  }
}

const guardarProducto = async () => {
  try {
    const productoAEnviar = {
      NombreProducto: nuevoProducto.value.NombreProducto,
      Cantidad: nuevoProducto.value.Cantidad,
      Gramos: nuevoProducto.value.Gramos,
      DescripcionProducto: nuevoProducto.value.DescripcionProducto,
      IngredientesProducto: nuevoProducto.value.Ingredientes,
      Precio: nuevoProducto.value.Precio,
      Escuela: nuevoProducto.value.Escuela,
      ImagenProducto: nuevoProducto.value.ImagenProducto
    };

    const res = await axios.post('https://x8ki-letl-twmt.n7.xano.io/api:Frc5TgG-/productos', productoAEnviar)

    if (res.status !== 200 && res.status !== 201) {
      console.error('Error: respuesta no satisfactoria del servidor', res);
      return;
    }

    await fetchProductos()
    showForm.value = false
    showToast.value = true
    router.push('/home-empresa')
    nuevoProducto.value = {
      NombreProducto: '',
      Cantidad: 0,
      Gramos: '',
      DescripcionProducto: '',
      Ingredientes: '',
      Precio: 0,
      Escuela: '',
      ImagenProducto: ''
    }
  } catch (error) {
    console.error('Error al guardar producto:', error)
  }
}

const logout = () => {
  localStorage.removeItem('expiry-eyes-token')
  router.push('/login')
}

onMounted(() => {
  // No llamar fetchProductos aquí para que no cargue al iniciar, solo cuando pulses "Ver Productos"
})

import { onBeforeRouteUpdate } from 'vue-router'
onBeforeRouteUpdate((to, from, next) => {
  fetchProductos()
  next()
})
</script>

<style scoped>
.producto-card {
  margin: 10px 0 100px;
}

ion-input,
ion-select {
  margin-bottom: 12px;
}

.form-container {
  margin-bottom: 40px;
}
</style>