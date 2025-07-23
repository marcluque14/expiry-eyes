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
      <div class="logout-icon-container" style="text-align: right; margin: 50px 10px 25px 0;">
        <ion-icon :icon="logOut" @click="logout" style="font-size: 24px; cursor: pointer; color: red;"></ion-icon>
      </div>
      <div class="search-bar-container">
        <ion-searchbar placeholder="Search"></ion-searchbar>
      </div>

      <div class="quick-actions">
        <ion-button fill="outline" color="primary">
          <ion-icon slot="start" :icon="heart" color="primary"></ion-icon>
          Favorites
        </ion-button>
        <ion-button fill="outline" color="primary">
          <ion-icon slot="start" :icon="refresh" color="primary"></ion-icon>
          History
        </ion-button>
        <ion-button fill="outline" color="primary">
          <ion-icon slot="start" :icon="personCircleOutline" color="primary"></ion-icon>
          Following
        </ion-button>
      </div>
      <h4 class="section-subtitle">Novedades</h4>

      <div class="promo-scroll">
        <div class="promo-card blue-gradient" @click="goToDiscounts">
          <h2>Ahorra más de un 50%</h2>
          <p>Consulta los productos con más descuento</p>
        </div>
        <div class="promo-card green-gradient" @click="goToEcoFriendly">
          <h2>Eco-friendly Week</h2>
          <p>Salva Productos Ecológicos cerca de ti</p>
        </div>
        <div class="promo-card gold-gradient" @click="goToOfertas">
          <h2>Descubre ofertas</h2>
          <p>Primer mes con envío gratuito</p>
        </div>
      </div>

      <div class="school-cards-section">
        <h4 class="section-subtitle">¡También en Escuelas!</h4>
        <div class="school-card-list">
          <div class="school-card" @click="showLaSallePopup">
            <img src="../assets/Salle.png" alt="La Salle" />
            <p>La Salle</p>
          </div>
          <div class="school-card" @click="mostrarBresol">
            <img src="@/assets/Bresol.avif" />
            <p>Bresol</p>
          </div>
        </div>
      </div>
      <div
        v-if="showPopupLaSalle"
        class="popup"
        style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
               background-color: white; border-radius: 20px; padding: 20px; width: 80%;
               box-shadow: 0px 4px 16px rgba(0,0,0,0.3); z-index: 1000; text-align: center;">
        <button @click="showPopupLaSalle = false"
          style="position: absolute; top: 10px; right: 15px; background: none; border: none; font-size: 20px;">✖</button>
        <h2>Espaguetis por solo 2.5 €</h2>
        <img src="@/assets/Espaguetis.jpg" alt="Espaguetis" style="width: 100%; border-radius: 12px; margin-top: 10px;" />
        <IonButton expand="block" color="success" class="ion-margin-top"
          @click="openMapsLaSalle()">Ir a buscarlo</IonButton>
      </div>

      <div class="supermarkets">
        <h4 class="supermarket-title">Supermercados</h4>
        <div class="supermarket-scroll">
          <div class="supermarket-card" v-for="supermarket in supermarkets" :key="supermarket.name">
            <div class="supermarket-info green-gradient">
              <h4>{{ supermarket.offer }}</h4>
              <p>{{ supermarket.distance }}km</p>
            </div>
            <div class="supermarket-bottom">
              <img :src="supermarket.logo" :alt="supermarket.name" />
              <p>{{ supermarket.name }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="recently-viewed">
        <h4 class="section-subtitle">Visto Recientemente</h4>
        <div class="recent-item">
          <img src="../assets/iogurt.png" alt="Iogurt Natural Danone" />
          <div class="recent-info">
            <p class="product-name">Iogurt Natural Danone</p>
            <p class="seen-time">Visto hace 1 minuto</p>
            <p class="price">1.29€ <span class="discount">-60%</span></p>
          </div>
          <div class="recent-units">8ud</div>
        </div>

        <div class="recent-item">
          <img src="../assets/leche.png" alt="Leche de Arroz x6" />
          <div class="recent-info">
            <p class="product-name">Leche de Arroz x6</p>
            <p class="seen-time">Visto hace 2 horas</p>
            <p class="price">4.99€ <span class="discount">-55%</span></p>
          </div>
          <div class="recent-units">6ud</div>
        </div>

        <div class="recent-item">
          <img src="../assets/zumo.png" alt="Zumo de Naranja 1L" />
          <div class="recent-info">
            <p class="product-name">Zumo de Naranja 1L</p>
            <p class="seen-time">Visto hace 6h</p>
            <p class="price">1.19€ <span class="discount">-30%</span></p>
          </div>
          <div class="recent-units">12ud</div>
        </div>
      </div>
      <div class="sostenibilidad-section">
        <h4 class="section-subtitle">Sostenibilidad y ExpiryEyes</h4>
        <p class="section-description">Información de interés</p>
        <div class="sostenibilidad-cards">
          <div class="sostenibilidad-card">
            <img src="../assets/Bancaliments.png" alt="ONGs" class="sostenibilidad-icon" />
            <h5>ONGs</h5>
            <p>Dona a ONGs asociadas</p>
          </div>
          <div class="sostenibilidad-card">
            <img src="../assets/comercio.png" alt="Únete a la causa" class="sostenibilidad-icon" />
            <h5>Únete a la causa</h5>
            <p>Tienes un Comercio? Contáctanos y ahorra</p>
          </div>
          <div class="sostenibilidad-card">
            <img src="../assets/ayuntamiento.png" alt="Nuestros Socios" class="sostenibilidad-icon" />
            <h5>Nuestros Socios</h5>
            <p>Descubre qué empresas colaboran con nosotros</p>
          </div>
          <div class="sostenibilidad-card">
            <img src="../assets/sostenibilidad.png" alt="Gestión Eco-friendly" class="sostenibilidad-icon" />
            <h5>Gestión Eco-friendly</h5>
            <p>Sostenibilidad y nuestra App</p>
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

.sostenibilidad-section {
  margin-top: 40px;
}

.sostenibilidad-section .section-subtitle {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.sostenibilidad-section .section-description {
  font-size: 14px;
  color: gray;
  margin-bottom: 15px;
}

.sostenibilidad-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
}

.sostenibilidad-card {
  flex: 0 0 48%;
  background: linear-gradient(to top, #38a169, #a0f0a0);
  border-radius: 10px;
  padding: 10px;
  color: white;
}

.sostenibilidad-card h5 {
  margin: 0 0 5px 0;
}

.sostenibilidad-card p {
  margin: 0;
  font-size: 12px;
}

.sostenibilidad-icon {
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin: 0 auto 10px auto;
  display: block;
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
</style>

const showBresol = ref(false);
// Dummy handler for Salle popup location button to prevent error if not present
function openSalleLocation() {
  window.open("https://www.google.com/maps?q=Carrer+de+Sant+Joan+Bta.+la+Salle,+12,+17002+Girona", "_blank");
}