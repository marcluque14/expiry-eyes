<template>
    <ion-page>
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/profile"></ion-back-button>
          </ion-buttons>
  
          <ion-title>Métodos de Pago</ion-title>
  
          <ion-buttons slot="end">
            <ion-button size="small" fill="clear" @click="onExtraButtonClick">Acción</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
        <ion-list>
          <ion-list-header>
            Tus tarjetas registradas
          </ion-list-header>
          <ion-item v-for="method in paymentMethods" :key="method.id">
            <ion-label>
              {{ method.cardHolder }} - **** **** **** {{ method.cardNumber ? method.cardNumber.slice(-4) : '----' }}
              <p style="font-size: 12px; color: gray;">
                {{ method.cardType || '--' }} - Expira: {{ method.expiryMonth || '--' }}/{{ method.expiryYear || '--' }}
              </p>
            </ion-label>
            <ion-button color="danger" fill="clear" size="small" @click="deleteMethod(method.id)">
              Eliminar
            </ion-button>
          </ion-item>
          <ion-item v-if="paymentMethods.length === 0">
            <ion-label>No tienes tarjetas registradas</ion-label>
          </ion-item>
        </ion-list>
  
        <ion-list>
          <ion-list-header>Añadir nueva tarjeta</ion-list-header>
          <ion-item>
            <ion-label position="floating">Titular de la tarjeta</ion-label>
            <ion-input v-model="newCardHolder"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Número de tarjeta</ion-label>
            <ion-input 
              v-model="newCardNumber" 
              maxlength="16" 
              type="tel"
              @input="detectCardType"
            ></ion-input>
            <img v-if="cardIcon" :src="cardIcon" alt="Card Icon" style="height:24px; margin-left:10px;" />
          </ion-item>
          <ion-item>
            <ion-label position="floating">Mes de expiración (MM)</ion-label>
            <ion-input v-model="newExpiryMonth" maxlength="2" type="tel"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Año de expiración (YYYY)</ion-label>
            <ion-input v-model="newExpiryYear" maxlength="4" type="tel"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Tipo de tarjeta</ion-label>
            <ion-select v-model="newCardType" placeholder="Selecciona tipo">
              <ion-select-option value="Visa">Visa</ion-select-option>
              <ion-select-option value="MasterCard">MasterCard</ion-select-option>
              <ion-select-option value="Amex">American Express</ion-select-option>
              <ion-select-option value="Discover">Discover</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-button expand="block" @click="addPaymentMethod" :disabled="isLoading">
            Añadir tarjeta
          </ion-button>
        </ion-list>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  // Icons (ajusta las rutas o URLs según tengas en tu proyecto)
  const visaIcon = '/assets/icons/visa.png';
  const mastercardIcon = '/assets/icons/mastercard.png';
  const amexIcon = '/assets/icons/amex.png';
  const discoverIcon = '/assets/icons/discover.png';
  
  const router = useRouter();
  const paymentMethods = ref<any[]>([]);
  const isLoading = ref(false);
  
  // Campos para la nueva tarjeta
  const newCardHolder = ref('');
  const newCardNumber = ref('');
  const newExpiryMonth = ref('');
  const newExpiryYear = ref('');
  const newCardType = ref('');
  const cardIcon = ref('');
  
  // Función para detectar tipo de tarjeta
  function detectCardType() {
    const number = newCardNumber.value.replace(/\D/g, ''); // Solo dígitos
    let detectedType = '';
  
    if (/^4/.test(number)) {
      detectedType = 'Visa';
      cardIcon.value = visaIcon;
    } else if (/^5[1-5]/.test(number)) {
      detectedType = 'MasterCard';
      cardIcon.value = mastercardIcon;
    } else if (/^3[47]/.test(number)) {
      detectedType = 'Amex';
      cardIcon.value = amexIcon;
    } else if (/^6(?:011|5)/.test(number)) {
      detectedType = 'Discover';
      cardIcon.value = discoverIcon;
    } else {
      detectedType = '';
      cardIcon.value = '';
    }
  
    newCardType.value = detectedType;
  }
  
  async function loadPaymentMethods() {
    isLoading.value = true;
    try {
      const res = await axios.get('https://x8ki-letl-twmt.n7.xano.io/api:cT810lfj/paymentmethods');
      console.log('Payment methods from API:', res.data); // Debug
      paymentMethods.value = res.data || [];
    } catch (error) {
      alert('Error al cargar métodos de pago');
    } finally {
      isLoading.value = false;
    }
  }
  
  async function addPaymentMethod() {
    if (
      !newCardHolder.value ||
      !newCardNumber.value ||
      !newExpiryMonth.value ||
      !newExpiryYear.value ||
      !newCardType.value
    ) {
      alert('Por favor, rellena todos los campos');
      return;
    }
  
    isLoading.value = true;
    try {
      const postData = {
        cardHolder: newCardHolder.value,
        cardNumber: newCardNumber.value,
        expiryMonth: newExpiryMonth.value,
        expiryYear: newExpiryYear.value,
        cardType: newCardType.value,
      };
      await axios.post('https://x8ki-letl-twmt.n7.xano.io/api:cT810lfj/paymentmethods', postData);
      alert('Método de pago añadido correctamente');
      // Limpiar campos
      newCardHolder.value = '';
      newCardNumber.value = '';
      newExpiryMonth.value = '';
      newExpiryYear.value = '';
      newCardType.value = '';
      cardIcon.value = '';
      await loadPaymentMethods();
    } catch (error) {
      alert('Error al añadir método de pago');
    } finally {
      isLoading.value = false;
    }
  }
  
  async function deleteMethod(id: string) {
    if (!confirm('¿Quieres eliminar esta tarjeta?')) return;
    isLoading.value = true;
    try {
      await axios.delete(`https://x8ki-letl-twmt.n7.xano.io/api:cT810lfj/paymentmethods/${id}`);
      alert('Tarjeta eliminada');
      await loadPaymentMethods();
    } catch (error) {
      alert('Error al eliminar tarjeta');
    } finally {
      isLoading.value = false;
    }
  }
  
  function onExtraButtonClick() {
    alert('Botón extra pulsado');
    // Aquí tu lógica para el botón, por ejemplo abrir un modal o recargar
  }
  
  onMounted(() => {
    loadPaymentMethods();
  });
  </script>
  
  <style scoped>
  ion-list-header {
    font-weight: bold;
    font-size: 1.2rem;
    margin-top: 15px;
    margin-bottom: 10px;
  }
  </style>