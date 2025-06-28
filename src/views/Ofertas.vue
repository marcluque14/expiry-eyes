<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Ofertas</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div v-for="store in offersBySupermarket" :key="store.name" class="store-section">
        <div class="store-header">
          <img :src="store.logo" :alt="store.name" class="store-logo"/>
          <h2>{{ store.name }}</h2>
        </div>
        <div class="products">
          <div v-for="product in store.products" :key="product.name" class="product-card">
            <img :src="product.image" :alt="product.name" />
            <div class="product-info">
              <p class="product-name">{{ product.name }}</p>
              <p class="expiry">Caduca en {{ product.expiry }}</p>
              <p class="price">{{ product.price }} <span class="old-price">{{ product.oldPrice }}</span></p>
            </div>
            <div class="discount-badge">{{ product.discount }}</div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton } from '@ionic/vue';
import hamburgesa from '../assets/hamburgesa.png';
import comidaperro from '../assets/comidaperro.png';
import platano from '../assets/platano.png';
import cocacola from '../assets/cocacola.png';
import helado from '../assets/helado.png';
import mercadonaLogo from '../assets/mercadona.png';
import aldiLogo from '../assets/aldi.png';
import carrefourLogo from '../assets/carrefour.png';

const offersBySupermarket = [
  {
    name: 'Mercadona',
    logo: mercadonaLogo,
    products: [
      { name: 'Hamburguesa', image: hamburgesa, expiry: '48h', price: '2.50€', oldPrice: '5.00€', discount: '-50%' },
      { name: 'Plátano', image: platano, expiry: '24h', price: '0.99€', oldPrice: '1.49€', discount: '-33%' },
    ]
  },
  {
    name: 'Aldi',
    logo: aldiLogo,
    products: [
      { name: 'Coca-Cola', image: cocacola, expiry: '72h', price: '1.20€', oldPrice: '2.00€', discount: '-40%' },
      { name: 'Helado', image: helado, expiry: '36h', price: '3.00€', oldPrice: '6.00€', discount: '-50%' },
    ]
  },
  {
    name: 'Carrefour',
    logo: carrefourLogo,
    products: [
      { name: 'Comida perro adulto 150g', image: comidaperro, expiry: '45h', price: '1.99€', oldPrice: '3.50€', discount: '-43%' },
    ]
  }
];
</script>

<style scoped>
.store-section {
  margin-bottom: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
.store-section h2 {
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0;
}
.products {
  display: flex;
  overflow-x: auto;
  gap: 10px;
}
.product-card {
  flex: 0 0 auto;
  width: 150px;
  background: white;
  border-radius: 10px;
  padding: 10px;
  position: relative;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.product-card img {
  width: 100%;
  border-radius: 10px;
}
.product-info {
  margin-top: 5px;
}
.product-name {
  font-weight: bold;
  font-size: 14px;
}
.expiry {
  font-size: 12px;
  color: gray;
}
.price {
  font-weight: bold;
  font-size: 14px;
}
.old-price {
  text-decoration: line-through;
  color: gray;
  margin-left: 5px;
  font-size: 12px;
}
.discount-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: red;
  color: white;
  padding: 2px 5px;
  border-radius: 5px;
  font-size: 12px;
}
.store-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.store-logo {
  width: 40px;
  height: 40px;
  border-radius: 20px;
}
</style>