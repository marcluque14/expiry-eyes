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
      <div class="dashboard">
        <div class="hero">
          <div class="brand" v-if="companyName || companyLogo">
            <ion-avatar class="brand-avatar" v-if="companyLogo">
              <img :src="companyLogo" alt="Logo supermercado" />
            </ion-avatar>
            <div class="brand-info">
              <h2 class="brand-name">{{ companyName || 'Mi supermercado' }}</h2>
              <small v-if="companyName" class="brand-hint">Sesión iniciada</small>
            </div>
          </div>
          <h1>Gestión rápida</h1>
          <p>Publica y revisa tus productos en venta.</p>
        </div>

        <div class="actions">
          <ion-button class="action primary" expand="block" size="large" @click="toggleProductos">
            <ion-icon :icon="albumsOutline" slot="start"></ion-icon>
            {{ showProductos ? 'Ocultar productos en venta' : 'Ver productos en venta' }}
          </ion-button>

          <ion-button class="action success" expand="block" size="large" color="success" @click="goSalvarProducto">
            <ion-icon :icon="addCircleOutline" slot="start"></ion-icon>
            Salvar producto
          </ion-button>
        </div>
      </div>

      <!-- Listado de productos con imagenes -->
      <div v-if="showProductos && productos.length > 0" class="productos-list">
        <ion-list>
          <ion-card v-for="producto in productos" :key="producto.id" class="producto-card">
            <ion-img v-if="resolveImg(producto.ImagenProducto, producto.NombreProducto)" :src="resolveImg(producto.ImagenProducto, producto.NombreProducto)" class="producto-imagen"></ion-img>
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
  IonThumbnail,
  IonIcon,
  IonAvatar
} from '@ionic/vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

import { addCircleOutline, albumsOutline } from 'ionicons/icons'


const getToken = () => localStorage.getItem('expiry-eyes-token') || ''

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
const selectedProducto = ref(null)
const actualizacion = ref({
  Cantidad: null,
  Precio: null,
  Fecha: ''
})

const showToast = ref(false)
const toastMessage = ref('')

const router = useRouter()

const companyLogo = ref('')
const companyName = ref('')

const saveCompanyLS = (name, logo) => {
  if (name) localStorage.setItem('company_name', name)
  if (logo) localStorage.setItem('company_logo', logo)
}
const loadCompanyLS = () => ({
  name: localStorage.getItem('company_name') || '',
  logo: localStorage.getItem('company_logo') || ''
})

const AUTH_BASE = 'https://xqy3-nsl3-g9gf.n7e.xano.io/api:B0XRi_En'
const PRODUCTS_BASE = 'https://xqy3-nsl3-g9gf.n7e.xano.io/api:Frc5TgG-'
const SUPERS_BASE = 'https://xqy3-nsl3-g9gf.n7e.xano.io/api:LgH6pM_-'

const loadCompany = async () => {
  // 1) from LS
  const fromLS = loadCompanyLS()
  if (fromLS.name || fromLS.logo) {
    companyName.value = fromLS.name
    companyLogo.value = fromLS.logo
  }
  const token = getToken()
  if (!token) return
  try {
    // 2) Try /auth/me for embedded supermarket info
    const me = await axios.get(`${AUTH_BASE}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
    const sId = me?.data?.supermercado_id
    const sName = me?.data?.supermercado_nombre || me?.data?.supermercadoName || ''
    const sLogo = me?.data?.supermercado_logo || me?.data?.supermercadoLogo || ''
    if (sName) companyName.value = sName
    if (sLogo) companyLogo.value = sLogo
    if ((sName || sLogo)) saveCompanyLS(companyName.value, companyLogo.value)
    // 3) If no logo/name yet, fetch supermarket resource by id
    if (!companyName.value || !companyLogo.value) {
      const sIdFinal = sId || getSupermercadoId()
      if (sIdFinal) {
        try {
          const s = await axios.get(`${SUPERS_BASE}/supermercados/${sIdFinal}`, { headers: { Authorization: `Bearer ${token}` } })
          const name = s?.data?.nombre || s?.data?.name || ''
          let logo = s?.data?.logo?.path || s?.data?.logo || ''
          if (logo && !/^https?:/i.test(logo)) {
            // si solo llega el nombre del archivo, servimos desde /logos/
            logo = `/logos/${encodeURI(logo)}`
          }
          if (name) companyName.value = name
          if (logo) companyLogo.value = logo
          if (companyName.value || companyLogo.value) saveCompanyLS(companyName.value, companyLogo.value)
        } catch (e) { /* silencioso si no existe el endpoint */ }
      }
    }
  } catch (e) {
    // silencioso
  }
}

const toggleProductos = async () => {
  showProductos.value = !showProductos.value
  if (showProductos.value) {
    await fetchProductos()
  }
}

const goSalvarProducto = () => {
  router.push('/salvar-producto')
}

const getSupermercadoId = () => {
  // Prioriza id_super si el login/administración lo establece manualmente
  const raw = localStorage.getItem('id_super')
    || localStorage.getItem('supermercado_id')
    || localStorage.getItem('expiry-eyes-company')
  if (!raw) return null
  try {
    const parsed = (() => { try { return JSON.parse(raw) } catch { return raw } })()
    const maybe = typeof parsed === 'object' && parsed ? (parsed.id ?? parsed.value ?? parsed) : parsed
    const n = Number(maybe)
    return isNaN(n) ? maybe : n
  } catch { return raw }
}

const fetchProductos = async () => {
  try {
    const supermercadoId = getSupermercadoId()
    const base = PRODUCTS_BASE
    // Intentamos con ambos parámetros por compatibilidad del backend
    const url = supermercadoId
      ? `${base}/productos?supermercado_id=${encodeURIComponent(supermercadoId)}&id_super=${encodeURIComponent(supermercadoId)}`
      : `${base}/productos`
    const res = await axios.get(url, { headers: { Authorization: `Bearer ${getToken()}` } })

    // Filtra SIEMPRE por el supermercado de sesión por si la API devolviera más
    const data = Array.isArray(res.data) ? res.data : []
    const sidNum = Number(supermercadoId)
    const onlyMine = supermercadoId == null ? data : data.filter(p => {
      const pid = Number(
        p?.supermercado_id ??
        p?.id_super ??
        p?.supermercados_id ??
        p?.supermercadoId ??
        p?.supermarket_id
      )
      if (!isNaN(sidNum) && !isNaN(pid)) return pid === sidNum
      const strPid = String(
        p?.supermercado_id ??
        p?.id_super ??
        p?.supermercados_id ??
        p?.supermercadoId ??
        p?.supermarket_id
      )
      return strPid === String(supermercadoId)
    })
    productos.value = onlyMine.slice().reverse()
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

    const d = res?.data?.data
    const direct = d?.image?.url || d?.medium?.url || d?.thumb?.url
    const display = d?.display_url || d?.url
    const finalUrl = direct || display
    if (finalUrl) {
      imagenSubidaUrl.value = finalUrl
      toastMessage.value = 'Imagen subida correctamente'
      showToast.value = true
    } else {
      console.error('Respuesta ImgBB inesperada:', res?.data)
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

const ascii = (s) => (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()

// Map de nombre normalizado -> nombre de fichero (en /public/products)
const productNameToFile = {
  'canelones': 'canelones.jpg',
  'macarronestomate': 'macarronesTomate.png',
  'guisoarroz': 'guisoArroz.png',
  'garbanzoscurry': 'GarbanzosCurry.png',
  'estofadopollo': 'estofadoPollo.png',
  'lasanacarne': 'LasañaCarne.png',
  'fileteconpatatas': 'FileteConPatatas.png',
  'mixverduras': 'MIxVerduras.png',
}

const publicPath = (file) => file ? `/products/${encodeURI(file)}` : ''

const resolveImg = (imgField, nombreProducto) => {
  // 1) URL/objeto válido desde backend
  if (imgField) {
    if (typeof imgField === 'string' && /^(http|https):/i.test(imgField)) return imgField
    if (imgField.path && /^(http|https):/i.test(imgField.path)) return imgField.path
    if (imgField.image && imgField.image.url) return imgField.image.url
    if (imgField.display_url) return imgField.display_url
    if (imgField.url) return imgField.url
  }

  // 2) Si el backend guarda solo el nombre de archivo (p.ej. "guisoArroz.png")
  const fileName = typeof imgField === 'string' && !/^https?:/i.test(imgField) ? imgField : ''
  if (fileName) return publicPath(fileName)

  // 3) Intentar por nombre del producto normalizado
  const key = ascii(nombreProducto).replace(/[^a-z0-9]+/g,'')
  if (productNameToFile[key]) return publicPath(productNameToFile[key])

  // 4) Sin imagen válida → vacío
  return ''
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
    const sid = getSupermercadoId()
    if (sid) {
      (productoAEnviar).supermercado_id = sid
      ;(productoAEnviar).id_super = sid
    }

    const res = await axios.post('https://xqy3-nsl3-g9gf.n7e.xano.io/api:Frc5TgG-/productos', productoAEnviar, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })

    if (res.status !== 200 && res.status !== 201) {
      toastMessage.value = 'Error al guardar producto.'
      showToast.value = true
      return
    }

    await fetchProductos()
    toastMessage.value = 'Producto guardado correctamente'
    showToast.value = true
    router.push('/home-empresa')
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
    const res = await axios.patch(`https://xqy3-nsl3-g9gf.n7e.xano.io/api:Frc5TgG-/productos/${selectedProducto.value.id}`, patchData, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
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
  loadCompany()
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

/* Dashboard layout */
.dashboard { 
  min-height: calc(100vh - 56px); /* header approx */
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: center; 
  gap: 24px;
}

.hero { text-align: center; }
.hero h1 { margin: 0; font-size: 24px; font-weight: 700; }
.hero p { margin: 6px 0 0; opacity: .8; }

.actions { width: 100%; max-width: 520px; display: flex; flex-direction: column; gap: 16px; }

.action { 
  height: 64px; 
  --border-radius: 14px; 
  font-size: 18px; 
  letter-spacing: .2px; 
  box-shadow: 0 10px 20px rgba(0,0,0,.08);
}
.action ion-icon { font-size: 24px; margin-right: 6px; }

/* Spacing for the list below */
.productos-list { margin-top: 18px; }

.brand { display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 8px; }
.brand-avatar { --border-radius: 14px; width: 56px; height: 56px; box-shadow: 0 4px 10px rgba(0,0,0,.08); overflow: hidden; }
.brand-name { font-size: 18px; margin: 0; }
.brand-hint { opacity: .7; }
</style>