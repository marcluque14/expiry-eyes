<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/tabs/home"></ion-back-button>
          </ion-buttons>
          <ion-title>Eco-friendly Week</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-card>
          <ion-card-header>
            <ion-card-title>🌱 Productos ecológicos salvados</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>
              Bienvenido a nuestra sección especial dedicada a la sostenibilidad. Aquí podrás descubrir productos ecológicos que han sido rescatados de supermercados locales. <strong>¡Aprovecha la oportunidad de consumir responsablemente y cuidar el planeta!</strong>
            </p>
            <ul>
              <li>🥕 Verduras orgánicas con un 40% de descuento</li>
              <li>🍪 Snacks bio próximos a caducar</li>
              <li>🌾 Pan y cereales integrales ecológicos</li>
            </ul>
          </ion-card-content>
        </ion-card>
  
        <!-- Nueva sección con tarjetas adicionales e iconos -->
        <ion-card class="fade-in">
          <ion-card-header>
            <ion-card-title>♻️ ¿Por qué elegir productos rescatados?</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p class="fade-in">
              Cada compra ayuda a reducir el desperdicio alimentario y a fomentar un consumo más sostenible. Estos productos están en perfecto estado y listos para formar parte de tu menú.
            </p>
          </ion-card-content>
        </ion-card>
  
        <ion-card class="fade-in-delay">
          <ion-card-header>
            <ion-card-title>🌍 Beneficios para ti y el planeta</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ul>
              <li>💚 Ahorra dinero y cuida tu salud</li>
              <li>🌱 Apoya iniciativas responsables</li>
              <li>📦 Productos con envases sostenibles</li>
            </ul>
          </ion-card-content>
        </ion-card>
  
        <ion-modal :is-open="showModal" @didDismiss="showModal = false">
          <ion-content class="ion-padding">
            <ion-header collapse="condense">
              <ion-toolbar>
                <ion-title>Productos Bio</ion-title>
                <ion-buttons slot="end">
                  <ion-button @click="showModal = false">
                    <ion-icon :icon="closeOutline"></ion-icon>
                  </ion-button>
                </ion-buttons>
              </ion-toolbar>
            </ion-header>
  
            <ion-slides pager="true">
              <ion-slide v-for="(product, index) in products" :key="index">
                <ion-card>
                  <img :src="product.image" alt="Producto" style="border-radius: 10px; max-height: 200px; object-fit: cover;" />
                  <ion-card-header>
                    <ion-card-title>{{ product.name }}</ion-card-title>
                  </ion-card-header>
                  <ion-card-content>
                    <p>{{ product.description }}</p>
                    <strong>🔥 {{ product.discount }}% de descuento</strong>
                  </ion-card-content>
                </ion-card>
              </ion-slide>
            </ion-slides>
          </ion-content>
        </ion-modal>
  
        <ion-button expand="block" @click="showModal = true">Ver productos bio destacados</ion-button>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup>
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton } from '@ionic/vue';
  import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';
  import { IonModal, IonSlides, IonSlide, IonButton, IonIcon } from '@ionic/vue';
import { ref, onMounted } from 'vue';
  import { closeOutline } from 'ionicons/icons';
  
  const showModal = ref(false);

onMounted(() => {
  showModal.value = true;
});
  
  const products = [
    {
      name: 'Zanahorias ecológicas',
      description: 'Frescas y cultivadas sin pesticidas.',
      discount: 40,
      image: 'https://source.unsplash.com/featured/?carrots'
    },
    {
      name: 'Pan integral bio',
      description: 'Hecho con harina 100% orgánica.',
      discount: 30,
      image: 'https://source.unsplash.com/featured/?bread'
    },
    {
      name: 'Snacks bio',
      description: 'Alternativas saludables para picar.',
      discount: 25,
      image: 'https://source.unsplash.com/featured/?snacks'
    },
    {
      name: 'Verduras variadas',
      description: 'Mix de verduras orgánicas recién recolectadas.',
      discount: 35,
      image: 'https://source.unsplash.com/featured/?vegetables'
    },
    {
      name: 'Cereales ecológicos',
      description: 'Ideales para un desayuno nutritivo.',
      discount: 20,
      image: 'https://source.unsplash.com/featured/?cereal'
    },
  ];
  </script>
  
  <style scoped>
  ul {
    margin-top: 15px;
    padding-left: 20px;
    list-style: none;
  }
  
  li {
    margin-bottom: 8px;
    font-size: 1.08em;
    display: flex;
    align-items: center;
    gap: 0.4em;
  }
  
  li::before {
    content: '';
    display: none;
  }
  
  ion-card-title {
    font-size: 1.4em;
    color: #2e7d32;
    display: flex;
    align-items: center;
    gap: 0.4em;
  }
  
  ion-card {
    margin-bottom: 22px;
    box-shadow: 0 4px 16px rgba(76, 175, 80, 0.12);
    border-radius: 18px;
    border: 1px solid #e0f2f1;
    transition: box-shadow 0.2s;
  }
  ion-card:hover {
    box-shadow: 0 8px 28px rgba(56, 142, 60, 0.18);
  }
  
  .fade-in {
    animation: fadeIn 1s ease-in forwards;
    opacity: 0;
  }
  
  .fade-in-delay {
    animation: fadeIn 1s ease-in forwards;
    animation-delay: 0.5s;
    opacity: 0;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  ion-modal {
    --height: 90%;
    --border-radius: 20px;
  }
  
  ion-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  ion-card {
    width: 90%;
  }
  </style>
  