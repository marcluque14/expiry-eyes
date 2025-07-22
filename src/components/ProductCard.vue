

<template>
  <ion-card class="product-card">
    <ion-card-header>
      <ion-grid>
        <ion-row>
          <ion-col size="3" class="image-col">
            <img :src="getImageUrl(image)" alt="Product Image" />
          </ion-col>
          <ion-col size="6" class="text-col">
            <h3>{{ name }}</h3>
            <p>Caduca: {{ expires }}</p>
            <p><strong>{{ price }}</strong></p>
            <ion-badge color="danger">{{ discount }}% OFF</ion-badge>
          </ion-col>
          <ion-col size="3" class="action-col">
            <ion-button size="small" fill="outline" color="success">
              Reservar
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-card-header>
  </ion-card>
</template>

<script setup>
defineProps({
  name: String,
  expires: String,
  price: String,
  discount: String,
  image: String,
  logo: String
})

const getImageUrl = (file) => new URL(`../assets/${file}`, import.meta.url).href
</script>

<style scoped>
.product-card {
  margin-bottom: 12px;
}

.image-col img {
  width: 100%;
  border-radius: 6px;
}

.text-col h3 {
  font-size: 14px;
  margin: 0 0 4px;
}

.text-col p {
  font-size: 12px;
  margin: 0;
}

.action-col {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>