

<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/home" text=""></ion-back-button>
        </ion-buttons>
        <ion-title>Resumen</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <ion-list>
        <ion-item>
          <ion-label>
            <h2>Facturación</h2>
            <p>Dirección de Facturación</p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <h2>Click&amp;Collect PickPoint</h2>
            <p>Plaza Independencia/16<br />Límite 24h</p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <h2>Pago</h2>
            <p>Visa *1234</p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <h2>Promos</h2>
            <p>Introduce el código aquí</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <ion-list>
        <ion-item>
          <ion-thumbnail slot="start">
            <img src="@/assets/salmon.png" />
          </ion-thumbnail>
          <ion-label>
            <h2>Mercadona</h2>
            <p>Escalopines de Salmón 350g</p>
            <p><strong>6.99€</strong></p>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-thumbnail slot="start">
            <img src="@/assets/peras.png" />
          </ion-thumbnail>
          <ion-label>
            <h2>Carrefour</h2>
            <p>Pera Bosc 1kg</p>
            <p>Cantidad: 1</p>
            <p><strong>2.99€</strong></p>
          </ion-label>
        </ion-item>
      </ion-list>

      <ion-list>
        <ion-item lines="none">
          <ion-label>Subtotal (2)</ion-label>
          <ion-note slot="end">9.98€</ion-note>
        </ion-item>
        <ion-item lines="none">
          <ion-label>Envío a PickPoint</ion-label>
          <ion-note slot="end">Free</ion-note>
        </ion-item>
        <ion-item lines="none">
          <ion-label>Tasas</ion-label>
          <ion-note slot="end">1€</ion-note>
        </ion-item>
        <ion-item lines="none">
          <ion-label><strong>Total</strong></ion-label>
          <ion-note slot="end"><strong>10.98€</strong></ion-note>
        </ion-item>
      </ion-list>

      <ion-button expand="block" color="dark" class="ion-margin-top">
        Place order
      </ion-button>
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
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonThumbnail,
  IonBackButton,
  IonButtons
} from '@ionic/vue'
</script>

<style scoped>
ion-item h2 {
  font-size: 14px;
  margin: 4px 0;
}
ion-item p {
  font-size: 12px;
  margin: 2px 0;
}
</style>