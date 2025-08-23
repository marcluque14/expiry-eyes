<file name=Home.vue path=/Users/marc/Downloads/ionic_vue_login_app/expiry-eyes/src/views>
<template>
  <div>
    <!-- Existing content above -->
    <div class="promo-scroll">
      <!-- Existing promo scroll content -->
    </div>

    <div class="school-cards-section">
      <h4 class="section-subtitle">¡También en Escuelas!</h4>
      <div class="school-card-list">
        <div class="school-card" @click="goToColegios">
          <img src="../assets/Salle.png" alt="La Salle" />
          <p>La Salle</p>
        </div>
        <div class="school-card" @click="goToColegios">
          <img src="../assets/Bresol.avif" alt="Bressol" />
          <p>Bressol</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

function goToColegios() {
  router.push('/colegios');
}

// Existing script content below
</script>

<style scoped>
/* Existing styles above */

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

/* Existing styles below */
</style>
</file>
