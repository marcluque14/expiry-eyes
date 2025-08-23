<template>
  <ion-card class="product-card">
    <ion-card-content>
      <ion-grid>
        <ion-row>
          <ion-col size="4" class="image-col" v-if="image">
            <img :src="image" alt="Product Image" />
          </ion-col>
          <ion-col size="8" class="text-col">
            <h3 v-if="name">{{ name }}</h3>
            <p v-if="expires">Caduca: {{ expires }}</p>
            <p v-if="price"><strong>{{ price }} €</strong></p>
            <p v-if="cantidad">Stock: {{ cantidad }}</p>
            <p v-if="gramos">Cantidad por unidad: {{ gramos }}</p>
            <ion-badge
              v-if="discount !== undefined && discount !== null && discount !== '' && discount !== 0 && discount !== '0'"
              color="success"
              class="discount-badge"
            >{{ discount }}% OFF</ion-badge>
            <div class="buttons">
              <ion-button size="small" fill="outline" class="detail-btn" @click="verDetalles">Detalles</ion-button>
              <ion-button size="small" class="reserve-btn">Reservar</ion-button>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-card-content>
  </ion-card>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  },
  name: String,
  expires: String,
  price: [String, Number],
  discount: [String, Number],
  image: String,
  logo: String,
  cantidad: [String, Number],
  gramos: String
})

function verDetalles() {
  router.push(`/producto/${props.id}`)
}
</script>

<style scoped>
.product-card {
  margin-bottom: 16px;
  border-radius: 12px;
  border: 1px solid #dcdcdc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
}

.image-col img {
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
}

.text-col {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.text-col h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px;
}

.text-col p {
  font-size: 13px;
  margin: 2px 0;
  color: #444;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  gap: 8px;
}

.detail-btn {
  --border-color: #00bfa6;
  --color: #00bfa6;
  --border-radius: 6px;
}

.reserve-btn {
  --background: linear-gradient(to right, #00bfa6, #00e6c3);
  --color: white;
  --border-radius: 6px;
}

.discount-badge {
  margin-top: 4px;
  align-self: flex-start;
}
</style>