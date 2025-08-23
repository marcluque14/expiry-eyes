<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/tabs/home">
          <ion-icon :icon="homeOutline"></ion-icon>
          <ion-label>Home</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="MapView" href="/tabs/MapView">
          <ion-icon :icon="compassOutline"></ion-icon>
          <ion-label>Explore</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="cart" href="/tabs/cart">
          <ion-icon :icon="cartOutline"></ion-icon>
          <ion-label>Cesta</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="notifications" href="/tabs/notifications">
          <ion-icon :icon="notificationsOutline"></ion-icon>
          <ion-label>Notifications</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="profile" href="/tabs/profile">
          <ion-icon :icon="personOutline"></ion-icon>
          <ion-label>Profile</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/vue';
import { homeOutline, compassOutline, cartOutline, notificationsOutline, personOutline } from 'ionicons/icons';
</script>