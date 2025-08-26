<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-button @click="goBack" fill="clear">Atrás</ion-button>
        </ion-buttons>
        <ion-title>Galería de Productos</ion-title>
        <ion-buttons slot="end">
          <ion-button color="success" @click="goNuevoProducto">Nuevo</ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar v-model="q" placeholder="Buscar por nombre o descripción" @ionInput="doSearch" />
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="gallery" v-if="filteredProductos.length">
        <div class="tile" v-for="p in filteredProductos" :key="p.id" @click="openDetalle(p)">
          <img
            :src="resolveImg(p.ImagenProducto, p.NombreProducto) || 'https://i.ibb.co/7QpKsCX/image-placeholder.png'"
            :alt="p.NombreProducto"
            loading="lazy"
            @error="(e) => { e.target.src = 'https://i.ibb.co/7QpKsCX/image-placeholder.png' }"
          />
          <div class="tile-info">
            <h3 class="name">{{ p.NombreProducto }}</h3>
            <p class="meta">€{{ p.Precio }} · {{ p.Gramos }}</p>
          </div>
        </div>
      </div>

      <div v-else class="empty">
        <p>No hay productos todavía.</p>
        <ion-button color="success" @click="goNuevoProducto">Añadir producto</ion-button>
      </div>

      <ion-modal :is-open="!!detalle" @didDismiss="detalle = null">
        <ion-content class="ion-padding" v-if="detalle">
          <ion-img v-if="resolveImg(detalle.ImagenProducto, detalle.NombreProducto)" :src="resolveImg(detalle.ImagenProducto, detalle.NombreProducto)" />
          <h2 style="margin-top:12px;">{{ detalle.NombreProducto }}</h2>
          <p><strong>Precio:</strong> €{{ detalle.Precio }}</p>
          <p><strong>Cantidad:</strong> {{ detalle.Cantidad }}</p>
          <p><strong>Gramos:</strong> {{ detalle.Gramos }}</p>
          <p><strong>Descripción:</strong> {{ detalle.DescripcionProducto }}</p>
          <p><strong>Ingredientes:</strong> {{ detalle.IngredientesProducto }}</p>
          <p v-if="detalle.Alergenos"><strong>Alérgenos:</strong> {{ detalle.Alergenos }}</p>
          <p v-if="detalle.FechaCreacion"><strong>Creado:</strong> {{ formatDate(detalle.FechaCreacion) }}</p>
          <ion-list style="margin-top: 12px;">
            <ion-item>
              <ion-label position="stacked">Precio (€)</ion-label>
              <ion-input type="number" inputmode="decimal" step="0.01" v-model="formPrecio"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Cantidad</ion-label>
              <ion-input type="number" inputmode="numeric" v-model="formCantidad"></ion-input>
            </ion-item>
          </ion-list>
          <ion-button expand="block" color="success" @click="publicarProducto" :disabled="isSaving" style="margin-top: 8px;">Añadir producto</ion-button>
          <ion-button expand="block" fill="outline" @click="detalle = null" style="margin-top: 8px;">Cerrar</ion-button>
        </ion-content>
      </ion-modal>

      <ion-toast :is-open="showToast" :message="toastMessage" duration="2000" @didDismiss="showToast = false" />
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
  IonButton,
  IonImg,
  IonModal,
  IonToast,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonInput
} from '@ionic/vue'
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'


const getToken = () => localStorage.getItem('expiry-eyes-token') || ''

const router = useRouter()

const productos = ref([])
const q = ref('')
const detalle = ref(null)
const showToast = ref(false)
const toastMessage = ref('')

const formPrecio = ref('')
const formCantidad = ref('')
const isSaving = ref(false)

const API_BASE = 'https://xqy3-nsl3-g9gf.n7e.xano.io/api:Frc5TgG-'

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
    const url = supermercadoId
      ? `${API_BASE}/productos?supermercado_id=${encodeURIComponent(supermercadoId)}&id_super=${encodeURIComponent(supermercadoId)}`
      : `${API_BASE}/productos`
    const res = await axios.get(url, { headers: { Authorization: `Bearer ${getToken()}` } })
    // Filtrar siempre por el supermercado de la sesión por si el backend devuelve más datos
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
  } catch (e) {
    console.error('Error al obtener productos:', e)
    toastMessage.value = 'No se pudieron cargar los productos'
    showToast.value = true
  }
}

const filteredProductos = computed(() => {
  if (!q.value) return productos.value
  const s = q.value.toLowerCase()
  return productos.value.filter(p =>
    (p.NombreProducto || '').toLowerCase().includes(s) ||
    (p.DescripcionProducto || '').toLowerCase().includes(s)
  )
})

const doSearch = () => {
  // La computada hace el filtro en tiempo real
}

const openDetalle = (p) => {
  detalle.value = p
  formPrecio.value = p?.Precio ?? ''
  formCantidad.value = p?.Cantidad ?? ''
}

const editarProducto = (p) => {
  if (!p) return
  router.push('/home-empresa')
}

const eliminarProducto = async (p) => {
  if (!p || !p.id) return
  const ok = confirm(`¿Eliminar "${p.NombreProducto}"?`)
  if (!ok) return
  try {
    await axios.delete(`${API_BASE}/productos/${p.id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    toastMessage.value = 'Producto eliminado'
    showToast.value = true
    detalle.value = null
    await fetchProductos()
  } catch (e) {
    console.error('No se pudo eliminar', e)
    toastMessage.value = 'No se pudo eliminar el producto'
    showToast.value = true
  }
}

const publicarProducto = async () => {
  if (!detalle.value) return
  const precioNum = Number(formPrecio.value)
  const cantidadNum = Number(formCantidad.value)
  if (isNaN(precioNum) || precioNum <= 0) {
    toastMessage.value = 'Introduce un precio válido (> 0)'
    showToast.value = true
    return
  }
  if (isNaN(cantidadNum) || cantidadNum <= 0) {
    toastMessage.value = 'Introduce una cantidad válida (> 0)'
    showToast.value = true
    return
  }
  const body = {
    NombreProducto: detalle.value.NombreProducto,
    Cantidad: cantidadNum,
    Gramos: detalle.value.Gramos,
    DescripcionProducto: detalle.value.DescripcionProducto,
    IngredientesProducto: detalle.value.IngredientesProducto,
    Precio: precioNum,
    ImagenProducto: detalle.value.ImagenProducto,
    FechaCreacion: new Date().toISOString(),
    Alergenos: detalle.value.Alergenos
  }
  // Añade supermercado_id del usuario por seguridad adicional (el backend también debe fijarlo)
  const sid = getSupermercadoId()
  if (sid) {
    body.supermercado_id = sid
    body.id_super = sid
  }

  try {
    isSaving.value = true
    await axios.post(`${API_BASE}/productos`, body, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    toastMessage.value = 'Producto añadido correctamente'
    showToast.value = true
    detalle.value = null
    await fetchProductos()
  } catch (e) {
    console.error('Error al añadir producto', e)
    toastMessage.value = 'No se pudo añadir el producto'
    showToast.value = true
  } finally {
    isSaving.value = false
  }
}

const goNuevoProducto = () => {
  router.push('/home-empresa')
}

const goBack = () => {
  router.back()
}

const formatDate = (isoOrDate) => {
  try {
    const d = new Date(isoOrDate)
    return d.toLocaleString()
  } catch { return isoOrDate }
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

onMounted(fetchProductos)
</script>

<style scoped>
/* Estilo de cuadrícula tipo galería iOS */
.gallery {
  column-count: 2;
  column-gap: 8px;
  padding: 12px;
}
@media (min-width: 640px) {
  .gallery { column-count: 3; }
}
@media (min-width: 960px) {
  .gallery { column-count: 4; }
}

.tile {
  break-inside: avoid;
  margin-bottom: 8px;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0,0,0,0.06);
  cursor: pointer;
  transition: transform .15s ease;
}
.tile:hover { transform: translateY(-2px); }

.tile img { width: 100%; display: block; object-fit: cover; }

.tile-info { padding: 8px 10px; }
.tile-info .name { font-size: 14px; margin: 0 0 2px; }
.tile-info .meta { font-size: 12px; opacity: .7; margin: 0; }

.empty { text-align: center; padding: 40px 16px; }
</style>
