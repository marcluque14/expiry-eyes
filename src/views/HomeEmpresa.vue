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

      <ion-button expand="block" @click="toggleProductos" style="margin-bottom: 10px;">
        {{ showProductos ? 'OCULTAR PRODUCTOS' : 'VER PRODUCTOS' }}
      </ion-button>

      <ion-button expand="block" @click="toggleCatalogo" style="margin-bottom: 20px;">
        {{ showCatalogo ? 'OCULTAR CATÁLOGO' : 'VER CATÁLOGO' }}
      </ion-button>

      <!-- Formulario para nuevo producto con carga de imagen -->
      <div v-if="showForm" class="form-container">
        <ion-input v-model="nuevoProducto.NombreProducto" label="Nombre" label-placement="floating" fill="outline"></ion-input>
        <ion-input v-model.number="nuevoProducto.Cantidad" type="number" label="Cantidad" label-placement="floating" fill="outline"></ion-input>
        <ion-input v-model="nuevoProducto.Gramos" label="Gramos" label-placement="floating" fill="outline"></ion-input>
        <ion-input v-model="nuevoProducto.DescripcionProducto" label="Descripción" label-placement="floating" fill="outline"></ion-input>
        <ion-input v-model="nuevoProducto.Ingredientes" label="Ingredientes" label-placement="floating" fill="outline"></ion-input>
        <ion-input v-model.number="nuevoProducto.Precio" type="number" label="Precio" label-placement="floating" fill="outline"></ion-input>
        <ion-select v-model="nuevoProducto.Escuela" label="Colegio" fill="outline" interface="popover">
          <ion-select-option value="Salle">Salle</ion-select-option>
          <ion-select-option value="Bresol">Bresol</ion-select-option>
        </ion-select>
        <label style="display: block; margin-bottom: 6px; font-weight: 600;">Imagen del Producto</label>
        <input type="file" @change="handleImageUpload" accept="image/*" />
        <ion-button expand="block" @click="guardarProducto" style="margin-top: 15px;">
          GUARDAR PRODUCTO
        </ion-button>
      </div>

      <!-- Listado de productos con imagenes -->
      <div v-if="showProductos && productos.length > 0" class="productos-list">
        <ion-list>
          <ion-card v-for="producto in productos" :key="producto.id" class="producto-card">
            <ion-img v-if="producto.ImagenProducto && producto.ImagenProducto.path" :src="producto.ImagenProducto.path" class="producto-imagen"></ion-img>
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

      <!-- Catálogo para seleccionar productos y subir datos adicionales -->
      <div v-if="showCatalogo && productos.length > 0" class="catalogo-container">
        <ion-list>
          <ion-item
            v-for="producto in productos"
            :key="producto.id"
            lines="full"
            class="catalogo-item"
            :class="{selected: selectedProducto && selectedProducto.id === producto.id}"
            @click="selectProducto(producto)"
          >
            <ion-thumbnail slot="start" v-if="producto.ImagenProducto && producto.ImagenProducto.path">
              <ion-img :src="producto.ImagenProducto.path"></ion-img>
            </ion-thumbnail>
            <ion-label>
              <h2>{{ producto.NombreProducto }}</h2>
              <p>{{ producto.DescripcionProducto }}</p>
            </ion-label>
          </ion-item>
        </ion-list>

        <div v-if="selectedProducto" class="form-container">
          <h3>Actualizar producto: {{ selectedProducto.NombreProducto }}</h3>
          <ion-input
            v-model.number="actualizacion.Cantidad"
            type="number"
            label="Cantidad"
            label-placement="floating"
            fill="outline"
          ></ion-input>
          <ion-input
            v-model.number="actualizacion.Precio"
            type="number"
            label="Precio"
            label-placement="floating"
            fill="outline"
          ></ion-input>
          <ion-input
            v-model="actualizacion.Fecha"
            type="date"
            label="Fecha"
            label-placement="floating"
            fill="outline"
          ></ion-input>
          <ion-button expand="block" @click="actualizarProducto" style="margin-top: 15px;">
            ACTUALIZAR PRODUCTO
          </ion-button>
        </div>
      </div>

      <ion-toast
        :is-open="showToast"
        :message="toastMessage"
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
  IonButtons,
  IonItem,
  IonLabel,
  IonImg,
  IonThumbnail
} from '@ionic/vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const showForm = ref(false)
const showProductos = ref(false)
const showCatalogo = ref(false)
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
const selectedProducto = ref(null)
const actualizacion = ref({
  Cantidad: null,
  Precio: null,
  Fecha: ''
})

const showToast = ref(false)
const toastMessage = ref('')

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
const toggleCatalogo = async () => {
  showCatalogo.value = !showCatalogo.value
  if (showCatalogo.value) {
    await fetchProductos()
  }
}

const fetchProductos = async () => {
  try {
    const res = await axios.get('https://x8ki-letl-twmt.n7.xano.io/api:Frc5TgG-/productos')
    productos.value = res.data.reverse()
  } catch (error) {
    console.error('Error al obtener productos:', error)
  }
}

const imagenSubidaUrl = ref('')
const imagenSubidaType = ref('')
const imagenSubidaSize = ref(0)

const API_KEY_IMGBB = '4c1c10b9e9d27226d44a062c3bda3135'

const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  imagenSubidaType.value = file.type
  imagenSubidaSize.value = file.size

  try {
    const base64 = await toBase64(file)
    const base64String = base64.split(',')[1]

    const formData = new FormData()
    formData.append('key', API_KEY_IMGBB)
    formData.append('image', base64String)

    const res = await axios.post('https://api.imgbb.com/1/upload', formData)

    if (res.data && res.data.data && res.data.data.url) {
      imagenSubidaUrl.value = res.data.data.url
      toastMessage.value = 'Imagen subida correctamente'
      showToast.value = true
    } else {
      throw new Error('No se pudo obtener URL de imagen subida')
    }
  } catch (error) {
    console.error('Error al subir la imagen a ImgBB:', error)
    toastMessage.value = 'Error al subir la imagen.'
    showToast.value = true
  }
}

const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

const guardarProducto = async () => {
  try {
    if (!nuevoProducto.value.NombreProducto || !nuevoProducto.value.Escuela) {
      toastMessage.value = 'Nombre y Colegio son obligatorios.'
      showToast.value = true
      return
    }

    if (!imagenSubidaUrl.value) {
      toastMessage.value = 'Debes subir una imagen.'
      showToast.value = true
      return
    }

    const productoAEnviar = {
      NombreProducto: nuevoProducto.value.NombreProducto,
      Cantidad: nuevoProducto.value.Cantidad,
      Gramos: nuevoProducto.value.Gramos,
      DescripcionProducto: nuevoProducto.value.DescripcionProducto,
      IngredientesProducto: nuevoProducto.value.Ingredientes,
      Precio: nuevoProducto.value.Precio,
      Escuela: nuevoProducto.value.Escuela,
      ImagenProducto: {
        path: imagenSubidaUrl.value,
        name: nuevoProducto.value.NombreProducto,
        type: imagenSubidaType.value,
        size: imagenSubidaSize.value,
        mime: imagenSubidaType.value,
        meta: {} // objeto meta vacío
      }
    }

    const res = await axios.post('https://x8ki-letl-twmt.n7.xano.io/api:Frc5TgG-/productos', productoAEnviar)

    if (res.status !== 200 && res.status !== 201) {
      toastMessage.value = 'Error al guardar producto.'
      showToast.value = true
      return
    }

    await fetchProductos()
    showForm.value = false
    toastMessage.value = 'Producto guardado correctamente'
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
    imagenSubidaUrl.value = ''
    imagenSubidaType.value = ''
    imagenSubidaSize.value = 0
  } catch (error) {
    console.error('Error al guardar producto:', error)
    toastMessage.value = 'Error al guardar producto.'
    showToast.value = true
  }
}

const selectProducto = (producto) => {
  selectedProducto.value = producto
  actualizacion.value = {
    Cantidad: producto.Cantidad || null,
    Precio: producto.Precio || null,
    Fecha: ''
  }
}

const actualizarProducto = async () => {
  if (!selectedProducto.value) return
  const patchData = {
    NombreProducto: selectedProducto.value.NombreProducto
  }
  if (actualizacion.value.Cantidad !== null && actualizacion.value.Cantidad !== undefined) {
    patchData.Cantidad = actualizacion.value.Cantidad
  }
  if (actualizacion.value.Precio !== null && actualizacion.value.Precio !== undefined) {
    patchData.Precio = actualizacion.value.Precio
  }
  if (actualizacion.value.Fecha) {
    patchData.Fecha = actualizacion.value.Fecha
  }
  if (Object.keys(patchData).length === 1) {
    toastMessage.value = 'Debe ingresar al menos un dato para actualizar.'
    showToast.value = true
    return
  }
  try {
    const res = await axios.patch(`https://x8ki-letl-twmt.n7.xano.io/api:Frc5TgG-/productos/${selectedProducto.value.id}`, patchData)
    if (res.status !== 200 && res.status !== 201) {
      console.error('Error: respuesta no satisfactoria del servidor', res)
      toastMessage.value = 'Error al actualizar producto.'
      showToast.value = true
      return
    }
    toastMessage.value = 'Producto actualizado correctamente'
    showToast.value = true
    selectedProducto.value = null
    actualizacion.value = { Cantidad: null, Precio: null, Fecha: '' }
    await fetchProductos()
  } catch (error) {
    console.error('Error al actualizar producto:', error)
    toastMessage.value = 'Error al actualizar producto.'
    showToast.value = true
  }
}

const logout = () => {
  localStorage.removeItem('expiry-eyes-token')
  router.push('/login')
}

onMounted(() => {
  // No cargar productos al iniciar, solo al pulsar botones
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
ion-select,
ion-item {
  margin-bottom: 12px;
}

.producto-imagen {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.catalogo-container {
  margin-top: 20px;
}

.catalogo-item {
  cursor: pointer;
  transition: background-color 0.3s;
  padding: 10px;
  border-radius: 12px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.catalogo-item.selected {
  background-color: #d0eaff;
}

.catalogo-item ion-thumbnail {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 12px;
}

.form-container {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #cce4ff;
  border-radius: 12px;
  background-color: #f8fbff;
}
</style>