<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/home" text=""></ion-back-button>
        </ion-buttons>
        <ion-title>Notifications</ion-title>
        <ion-buttons slot="end">
          <ion-button fill="clear">
            <ion-icon :icon="settingsOutline" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <ion-searchbar placeholder="Buscar productos..." />

      <div class="section">
        <h3>Today</h3>
        <ProductCard
          logo="mercadona"
          name="Escalopines de Salmón"
          expires="20/07/2025"
          price="6.99€"
          discount="30"
          image="salmon.png"
        />
        <ProductCard
          logo="lidl"
          name="Iogurt Natural Pack 4"
          expires="20/07/2025"
          price="1.89€"
          discount="20"
          image="iogurt.png"
        />
        <ProductCard
          logo="carrefour"
          name="Pera Bosc 1kg"
          expires="20/07/2025"
          price="2.99€"
          discount="25"
          image="peras.png"
        />
      </div>

      <div class="section">
        <h3>Tomorrow</h3>
        <ProductCard
          logo="lidl"
          name="Pan de payés"
          expires="21/07/2025"
          price="1.49€"
          discount="40"
          image="pan.png"
        />
        <ProductCard
          logo="mercadona"
          name="Hummus clàssic 250g"
          expires="21/07/2025"
          price="1.99€"
          discount="15"
          image="hummus.png"
        />
      </div>
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
  IonBackButton,
  IonButton,
  IonSearchbar,
  IonIcon
} from '@ionic/vue'
import { settingsOutline } from 'ionicons/icons'
import ProductCard from '@/components/ProductCard.vue'
</script>

<style scoped>
.section h3 {
  font-size: 16px;
  margin-top: 24px;
  margin-bottom: 12px;
  font-weight: 600;
}
</style>