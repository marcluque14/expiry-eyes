<template>
  <ion-page>

    <ion-content class="ion-padding" :fullscreen="true">
      <div v-if="showSalleMenu" class="salle-alert">
        <div class="salle-alert-content" style="position: relative;">
          <button @click="showSalleMenu = false" style="position: absolute; top: 8px; right: 8px; background: transparent; border: none; font-size: 20px;">×</button>
          <p><strong>Espaguetis por solo 2.5 €</strong></p>
          <img src="../assets/Espaguetis.jpg" alt="Espaguetis" />
          <ion-button expand="block" color="warning" @click="openSalleLocation" style="margin-top: 10px;">
            Click aquí para ir a la ubicación
          </ion-button>
        </div>
      </div>
      <div v-if="showSchoolNotice" class="school-notice">
        <div class="school-notice-content">
          <ion-icon :icon="close" class="close-icon" @click="dismissSchoolNotice"></ion-icon>
          <p><strong>Novedades:</strong> ¡Ahora también trabajamos con <u>Escuelas</u>!</p>
          <img src="../assets/Comedor.jpg" alt="Comedor" style="width: 100%; border-radius: 8px;" />
        </div>
      </div>
      <div class="logout-icon-container">
        <ion-icon :icon="logOut" @click="logout" style="font-size: 24px; cursor: pointer; color: red;"></ion-icon>
      </div>
      <div class="search-bar-container">
        <ion-searchbar placeholder="Search"></ion-searchbar>
      </div>

      <div class="quick-actions">
        <div style="padding: 0;">
          <div style="padding: 0;">
            <div>
              <!-- Carrusel horizontal actualizado de categorías -->
              <div style="overflow-x: auto; white-space: nowrap;">
                <div style="display: inline-block; min-width: 100%;">
                  <div style="display: flex; flex-direction: row; align-items: flex-start;">
                    <div style="padding: 0;">
                      <div style="padding-bottom: 16px;">
                        <!-- Bloque actualizado (DART) convertido a HTML/CSS -->
                        <div style="display: flex; flex-direction: row; justify-content: flex-start; width: 100%;">
                          <!-- Colegios -->
                          <div style="padding-left: 12px;">
                            <div style="display: flex; flex-direction: column; align-items: center;">
                              <div
                                class="category-circle"
                                style="
                                  width: 72px; height: 72px;
                                  background: #bdbdbd;
                                  border-radius: 50%;
                                  overflow: hidden;
                                  display: flex; align-items: center; justify-content: center;
                                "
                              >
                                <img src="../assets/Bresol.avif" alt="Colegios" style="width: 100%; height: 100%; object-fit: cover;" />
                              </div>
                              <div style="font-size: 13px; margin-top: 4px;">Colegios</div>
                            </div>
                          </div>
                          <!-- Supermercados -->
                          <div style="padding-left: 12px;">
                            <div style="display: flex; flex-direction: column; align-items: center;">
                              <div
                                class="category-circle"
                                style="
                                  width: 72px; height: 72px;
                                  background: #bdbdbd;
                                  border-radius: 50%;
                                  overflow: hidden;
                                  display: flex; align-items: center; justify-content: center;
                                "
                              >
                                <img src="../assets/mercadona.png" alt="Supermercados" style="width: 100%; height: 100%; object-fit: cover;" />
                              </div>
                              <div style="font-size: 13px; margin-top: 4px;">Supermercados</div>
                            </div>
                          </div>
                          <!-- Restaurantes -->
                          <div style="padding-left: 12px;">
                            <div style="display: flex; flex-direction: column; align-items: center;">
                              <div
                                class="category-circle"
                                style="
                                  width: 72px; height: 72px;
                                  background: #bdbdbd;
                                  border-radius: 50%;
                                  overflow: hidden;
                                  display: flex; align-items: center; justify-content: center;
                                "
                              >
                                <img src="../assets/restaurantes.jpeg" alt="Restaurantes" style="width: 100%; height: 100%; object-fit: cover;" />
                              </div>
                              <div style="font-size: 13px; margin-top: 4px;">Restaurantes</div>
                            </div>
                          </div>
                          <!-- Comercios -->
                          <div style="padding-left: 12px;">
                            <div style="display: flex; flex-direction: column; align-items: center;">
                              <div
                                class="category-circle"
                                style="
                                  width: 72px; height: 72px;
                                  background: #bdbdbd;
                                  border-radius: 50%;
                                  overflow: hidden;
                                  display: flex; align-items: center; justify-content: center;
                                "
                              >
                                <img src="../assets/comercio.png" alt="Comercios" style="width: 100%; height: 100%; object-fit: cover;" />
                              </div>
                              <div style="font-size: 13px; margin-top: 4px;">Comercios</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h4 class="section-subtitle">Novedades</h4>

      <div class="stacked-carousel carousel-frame bordered-novedades">
        <img
          src="@/assets/Bresol.avif"
          class="carousel-image zoomable"
          @click="openFullscreen('@/assets/Bresol.avif')"
        />
      </div>

      <div class="espaciador">
      <div style="margin-top: 10px; padding-top: 10px; border-top: 2px solid #e0e0e0;"></div>
      <div style="background-color: #e5f9e7; border-radius: 16px; padding: 20px; margin: 10px;">
        <div class="sostenibilidad-section">
          <h4 class="section-subtitle">🌱 Sostenibilidad y ExpiryEyes</h4>
          <p class="section-description">Actuamos por un futuro más justo, saludable y sostenible.</p>
          <div class="sostenibilidad-grid">
            <div class="sostenibilidad-card">
              <img src="../assets/Bancaliments.png" alt="ONGs" class="sostenibilidad-icon" />
              <h5>ONGs</h5>
              <p>Dona a organizaciones asociadas y evita el desperdicio alimentario.</p>
            </div>
            <div class="sostenibilidad-card" @click="$router.push('/unete')" style="cursor: pointer;">
              <img src="../assets/comercio.png" alt="Únete a la causa" class="sostenibilidad-icon" />
              <h5>Únete a la causa</h5>
              <p>¿Tienes un comercio? Súmate y ayuda reduciendo residuos.</p>
            </div>
            <div class="sostenibilidad-card" @click="$router.push('/ayuntamientos')" style="cursor: pointer;">
              <img src="../assets/ayuntamiento.png" alt="Nuestros Socios" class="sostenibilidad-icon" />
              <h5>Nuestros Socios</h5>
              <p>Colaboramos con ayuntamientos y entidades públicas.</p>
            </div>
            <div class="sostenibilidad-card">
              <img src="../assets/sostenibilidad.png" alt="Eco-Gestión" class="sostenibilidad-icon" />
              <h5>Gestión Eco-Friendly</h5>
              <p>Optimizamos procesos para reducir huella ecológica.</p>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div v-if="showBresolPopup" class="popup-overlay">
        <div class="popup-content">
          <!-- Ion Header for Bresol popup -->
          <ion-header>
            <ion-toolbar>
              <ion-buttons slot="start">
                <ion-back-button defaultHref="/home"></ion-back-button>
              </ion-buttons>
              <ion-title class="ion-text-center">
                Canalones con bechamel
              </ion-title>
            </ion-toolbar>
          </ion-header>
          <button class="close-button" @click="cerrarPopupBresol">✖</button>
          <img src="@/assets/Canalones.jpeg" alt="Canalones" class="popup-img" />
          <p><strong>Precio:</strong> 3,90 €</p>
          <ion-button @click="$router.push('/product-details')">
            Ir a buscarlo
          </ion-button>
        </div>
      </div>
    </ion-content>
    <div v-if="showFullscreen" class="fullscreen-overlay" @touchstart="startTouch" @touchmove="handleTouchMove">
      <img :src="fullscreenImage" class="fullscreen-image" />
      <button class="close-button" @click="closeFullscreen">✖</button>
    </div>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonSearchbar,
  IonButton,
  IonIcon,
  IonBackButton,
  IonButtons
} from '@ionic/vue';
import { heart, refresh, personCircleOutline, close } from 'ionicons/icons';
import { logOut as logoutIcon } from 'ionicons/icons';

import mercadonaLogo from '../assets/mercadona.png';
import carrefourLogo from '../assets/carrefour.png';
import aldiLogo from '../assets/aldi.png';
import bonpreuLogo from '../assets/bonpreu.png';

const supermarkets = [
  { name: 'Mercadona', logo: mercadonaLogo, offer: '18 Productos Caducan en 72h', distance: 2 },
  { name: 'Carrefour', logo: carrefourLogo, offer: '3x2 en Lácteos', distance: 3 },
  { name: 'Aldi', logo: aldiLogo, offer: '10% de descuento hoy', distance: 4 },
  { name: 'Bonpreu', logo: bonpreuLogo, offer: '15 Productos Caducan en 48h', distance: 5 },
];

const username = ref('Marc Expiry Eyes');
const email = ref('marc@expiryeyes.com');
const router = useRouter();

const showSchoolNotice = ref(true);
function dismissSchoolNotice() {
  showSchoolNotice.value = false;
}

const logOut = logoutIcon;

function logout() {
  localStorage.removeItem('expiry-eyes-token');
  router.push('/login');
}

function goToSettings() {
  alert('Ir a configuración (pendiente)');
}

function goToHelp() {
  alert('Ir a ayuda (pendiente)');
}

function goToDiscounts() {
  router.push('/discounts');
}

function goToEcoFriendly() {
  router.push('/eco-friendly');
}

function goToSpecialOffer() {
  router.push('/special-offer');
}

function goToOfertas() {
  router.push('/ofertas');
}

function goToColegios() {
  router.push('/colegios');
}

const showSalleMenu = ref(false);

const showPopupLaSalle = ref(false);
const showLaSallePopup = () => {
  showPopupLaSalle.value = true;
};
const openMapsLaSalle = () => {
  window.open("https://www.google.com/maps?q=Carrer+de+Sant+Joan+Bta.+la+Salle,+12,+17002+Girona", "_blank");
}

const showBresolPopup = ref(false);

function mostrarBresol() {
  showBresolPopup.value = true;
}

function cerrarPopupBresol() {
  showBresolPopup.value = false;
}

const refreshHome = () => {
  router.replace('/tabs/home')
  window.location.reload()
}

const activeSlideIndex = ref(0);
// setInterval(() => {
//   activeSlideIndex.value = (activeSlideIndex.value + 1) % 3;
// }, 3000);

// Fullscreen carousel image logic
const showFullscreen = ref(false);
const fullscreenImage = ref('');
const touchStartY = ref(0);

function openFullscreen(imagePath) {
  fullscreenImage.value = require(imagePath);
  showFullscreen.value = true;
}

function closeFullscreen() {
  showFullscreen.value = false;
}

function startTouch(e) {
  touchStartY.value = e.touches[0].clientY;
}

function handleTouchMove(e) {
  const touchY = e.touches[0].clientY;
  if (touchY - touchStartY.value > 80) {
    closeFullscreen();
  }
}
</script>

<style scoped>

.supermarkets {
  text-align: center;
  margin: 20px 0;
}

.supermarket-scroll {
  display: flex;
  overflow-x: auto;
  gap: 10px;
  padding: 10px 0;
}

.supermarket-scroll::-webkit-scrollbar {
  display: none;
}

.supermarket-card {
  flex: 0 0 auto;
  width: 180px;
  border-radius: 10px;
  overflow: hidden;
  background: white;
}

.supermarket-info {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  color: white;
  padding: 8px;
  height: 50%;
  min-height: 56px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.supermarket-bottom {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 0;
  background: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.supermarket-card img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: contain;
}

.supermarket-info h4 {
  font-size: 12px; /* reduced font */
  margin: 0;
}

.supermarket-info p {
  font-size: 10px; /* reduced font */
  margin: 0;
}

.supermarket-logos {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.supermarket-logos img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.search-bar-container {
  margin: 10px 0;
  margin-top: 50px;
}

.quick-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
}

.quick-actions ion-button {
  flex: none;
  margin: 3px;
  font-size: 12px;
  padding: 2px 4px;
  height: 30px;
  --border-radius: 8px;
  --padding-start: 10px;
  --padding-end: 10px;
}

.toolbar-logo-inline {
  height: 30px;
  vertical-align: middle;
  margin-right: 5px;
}

.promo-scroll {
  display: flex;
  overflow-x: auto;
  gap: 10px;
  padding: 10px 0;
  margin-bottom: 50px; /* increased space below promo cards */
}

.promo-scroll::-webkit-scrollbar {
  display: none; /* hides scrollbar for iOS aesthetic */
}

.promo-card {
  flex: 0 0 auto;
  width: 280px; /* decreased width */
  height: 120px; /* decreased height */
  border-radius: 10px;
  color: white;
  padding: 15px; /* adjusted padding */
}

.promo-card h2 {
  font-size: 16px;
  margin-bottom: 5px;
}

.promo-card p {
  font-size: 12px;
}

.blue-gradient {
  background: linear-gradient(to right, #2b6cb0, #2c5282);
}

.green-gradient {
  background: linear-gradient(to right, #38a169, #2f855a);
}

.gold-gradient {
  background: linear-gradient(to right, #d4af37, #b8860b);
}

ion-slides {
  margin-bottom: 20px;
}

.section-subtitle {
  font-size: 14px;
  font-weight: 500;
  margin: 10px 0 5px 10px;
  text-align: left;
}

.supermarket-title {
  font-size: 14px;
  font-weight: 500;
  margin: 10px 0 5px 10px;
  text-align: left;
}

.recently-viewed {
  margin-top: 50px; /* increased from 30px to 50px for more space */
}

.recent-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  border-radius: 10px;
  padding: 10px;
  margin: 5px 0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1); /* optional subtle shadow */
  border: 1px solid #e0e0e0; /* optional light border */
}

.recent-item img {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.recent-info {
  flex: 1;
  margin-left: 10px;
}

.product-name {
  font-weight: bold;
  margin: 0;
}

.seen-time {
  font-size: 12px;
  color: gray;
  margin: 2px 0;
}

.price {
  font-weight: bold;
  margin: 2px 0;
}

.discount {
  color: red;
  margin-left: 5px;
}

.recent-units {
  color: red;
  font-weight: bold;
}

.espaciador {
  margin-top: 10px;
}
  .sostenibilidad-section {
    padding: 24px;
    background: linear-gradient(135deg, #e0f8dc 0%, #d1f2c6 100%);
    border-radius: 16px;
    margin: 20px 10px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  .sostenibilidad-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }

  .sostenibilidad-card {
    background: white;
    border-radius: 12px;
    padding: 16px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .sostenibilidad-card:hover {
    transform: translateY(-5px) scale(1.03);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }

  .sostenibilidad-icon {
    width: 64px;
    height: 64px;
    object-fit: contain;
    margin-bottom: 12px;
  }

  .sostenibilidad-card h5 {
    margin: 0;
    font-size: 16px;
    font-weight: bold;
    color: #2e7d32;
  }

  .sostenibilidad-card p {
    font-size: 13px;
    color: #555;
    margin-top: 6px;
  }

.school-notice {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fef3c7;
  color: #92400e;
  padding: 24px;
  width: 80%;
  max-width: 400px;
  border-left: 6px solid #f59e0b;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  z-index: 9999;
}

.school-notice-content {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
}

.school-notice-content p {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  width: 100%;
}

.close-icon {
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 8px;
  right: 8px;
}

.school-cards-section {
  margin-top: 30px;
  padding: 10px;
  text-align: left;
}

.school-card-list {
  display: flex;
  justify-content: space-around;
  gap: 10px;
  margin-top: 10px;
}

.school-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  text-align: center;
  width: 45%;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  cursor: pointer;
}

.school-card img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.school-card p {
  margin: 8px 0;
  font-weight: bold;
  font-size: 14px;
}

.salle-menu {
  margin: 20px 10px;
}

.salle-alert {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fef3c7;
  color: #92400e;
  padding: 16px;
  width: 300px;
  border-left: 6px solid #f59e0b;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  z-index: 9999;
}

.salle-alert-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.salle-alert-content p {
  font-size: 14px;
  font-weight: bold;
  margin: 0;
}

.salle-alert-content img {
  width: 100%;
  border-radius: 8px;
}

.salle-close-icon {
  font-size: 20px;
  cursor: pointer;
  position: absolute;
  top: 4px;
  right: 4px;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.popup-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  position: relative;
}

.popup-img {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 10px;
}

.close-btn {
  /* deprecated, replaced by .close-button */
  display: none;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.fullscreen-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fullscreen-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease-in-out;
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  color: white;
  border: none;
  font-size: 30px;
}
  .zoomable {
    transition: transform 0.4s ease-in-out;
    transform: scale(1);
    cursor: pointer;
  }

  .zoomable:hover {
    transform: scale(1.03);
  }

  .fullscreen-overlay {
    animation: fadeIn 0.4s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .category-circle {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .category-circle:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  .logout-icon-container {
    text-align: right;
    margin: 10px 10px 15px 0;
  }
</style>

 .stacked-carousel {
   position: relative;
   width: 100%;
   height: 90px;
   margin-bottom: 20px;
   overflow: hidden;
 }

 .carousel-frame {
   border-radius: 20px;
   border: 2px solid white;
   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
 }

 .carousel-image {
   position: absolute;
   top: 0;
   left: 0;
   width: 50%;
   height: 50%;
   object-fit: contain;
   border-radius: 20px;
   transition: opacity 1s ease-in-out;
   margin: 0 auto;
   max-width: 80%;
   border: 2px solid white;
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
 }

 .fade-enter-active, .fade-leave-active {
   transition: opacity 1s;
 }
 .fade-enter-from, .fade-leave-to {
   opacity: 0;
 }
// Dummy handler for Salle popup location button to prevent error if not present
function openSalleLocation() {
  window.open("https://www.google.com/maps?q=Carrer+de+Sant+Joan+Bta.+la+Salle,+12,+17002+Girona", "_blank");
}
.stacked-carousel {
  margin-top: 10px;
}

.bordered-novedades {
  border: 2px solid #ccc;
  border-radius: 16px;
  padding: 8px;
  background-color: white;
}