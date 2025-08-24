<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="success">
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/ayuntamientos" text="Atrás"></ion-back-button>
        </ion-buttons>
        <ion-title>Impacto Medioambiental</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="impacto-container">
        <img src="../assets/sostenibilidad.png" alt="CO2" class="impacto-icon" />
        <h2>Calculadora de CO₂ evitado</h2>
        <p>Elige alimento y cantidad. Calculamos tu impacto al instante 🌍</p>

        <div class="calc-card">
          <div class="calc-row">
            <!-- Selección de alimento -->
            <ion-item class="calc-item">
              <ion-label>Alimento</ion-label>
              <ion-select v-model="alimento" interface="popover" placeholder="Elige un alimento">
                <ion-select-option value="general">General</ion-select-option>
                <ion-select-option value="pan">Pan y bollería</ion-select-option>
                <ion-select-option value="fruta">Fruta / Verdura</ion-select-option>
                <ion-select-option value="lacteo">Lácteos</ion-select-option>
                <ion-select-option value="comida">Comida preparada</ion-select-option>
                <ion-select-option value="carne">Carne</ion-select-option>
              </ion-select>
            </ion-item>

            <!-- Cantidad -->
            <ion-item class="calc-item">
              <ion-label position="floating">Unidades</ion-label>
              <ion-input type="number" min="0" v-model.number="cantidad" placeholder="Ej: 3"></ion-input>
            </ion-item>
          </div>

          <div class="calc-row">
            <ion-item class="calc-item readonly">
              <ion-label>Factor</ion-label>
              <div class="calc-value">{{ factorActual.toFixed(2) }} kg CO₂ / unidad</div>
            </ion-item>
          </div>

          <div class="calc-result" :class="{ positive: cantidad > 0 }">
            <div class="result-label">CO₂ evitado</div>
            <div class="result-value">{{ co2Evitado.toFixed(2) }}<span class="unit"> kg</span></div>
          </div>

          <div class="calc-actions">
            <ion-button color="primary" :disabled="cantidad <= 0" @click="addImpact">Añadir a mi impacto</ion-button>
            <ion-button fill="outline" color="medium" @click="resetCalc">Limpiar</ion-button>
          </div>

          <!-- Feedback -->
          <ion-toast
            :is-open="toastOpen"
            message="Añadido a tu impacto ✅"
            :duration="1600"
            position="top"
            @didDismiss="toastOpen = false"
          ></ion-toast>
        </div>

        <div class="impact-summary" v-if="impactLog.length">
          <h3>Mi impacto</h3>
          <p class="total">Total acumulado: <strong>{{ totalAcumulado.toFixed(2) }} kg CO₂</strong></p>
          <ul class="history">
            <li v-for="(it, idx) in lastFive" :key="idx">
              <span>{{ it.fecha }}</span>
              <span>· {{ labelAlimento(it.alimento) }}</span>
              <span>· {{ it.cantidad }} uds</span>
              <strong> → {{ it.co2.toFixed(2) }} kg</strong>
            </li>
          </ul>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonToast
} from '@ionic/vue';
import { ref, computed } from 'vue';

const cantidad = ref<number>(0);
const alimento = ref<string>('general');

// Factores de CO₂ (kg por unidad) por tipo de alimento
const factores: Record<string, number> = {
  general: 2.5,
  pan: 1.1,
  fruta: 0.8,
  lacteo: 2.0,
  comida: 3.5,
  carne: 6.0,
};

const factorActual = computed(() => factores[alimento.value] ?? factores.general);
const co2Evitado = computed(() => (cantidad.value || 0) * factorActual.value);

function resetCalc() {
  cantidad.value = 0;
  alimento.value = 'general';
}

import { onMounted } from 'vue';

type ImpactEntry = {
  fecha: string;       // YYYY-MM-DD HH:mm
  alimento: string;    // key
  cantidad: number;    // unidades
  factor: number;      // kg/ud
  co2: number;         // resultado kg
};

const toastOpen = ref(false);
const impactLog = ref<ImpactEntry[]>([]);

function loadLog() {
  try {
    const raw = localStorage.getItem('impact_log');
    impactLog.value = raw ? JSON.parse(raw) : [];
  } catch {
    impactLog.value = [];
  }
}

function saveLog() {
  localStorage.setItem('impact_log', JSON.stringify(impactLog.value));
}

function nowStamp(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function labelAlimento(key: string): string {
  const labels: Record<string, string> = {
    general: 'General',
    pan: 'Pan y bollería',
    fruta: 'Fruta/Verdura',
    lacteo: 'Lácteos',
    comida: 'Comida preparada',
    carne: 'Carne',
  };
  return labels[key] ?? key;
}

function addImpact() {
  const entry: ImpactEntry = {
    fecha: nowStamp(),
    alimento: alimento.value,
    cantidad: Math.max(0, Number(cantidad.value || 0)),
    factor: factorActual.value,
    co2: co2Evitado.value,
  };
  if (entry.cantidad <= 0) return;
  impactLog.value.unshift(entry);
  // Limitar historial a 100 entradas por simplicidad
  if (impactLog.value.length > 100) impactLog.value.pop();
  saveLog();
  toastOpen.value = true;
}

const totalAcumulado = computed(() => impactLog.value.reduce((s, it) => s + (it.co2 || 0), 0));
const lastFive = computed(() => impactLog.value.slice(0, 5));

onMounted(loadLog);
</script>

<style scoped>
.impacto-container {
  text-align: center;
  padding-top: 16px;
}

.impacto-icon {
  width: 80px;
  margin-bottom: 16px;
}

.impacto-card {
  background: #e0f8dc;
  margin: 12px auto;
  padding: 16px;
  border-radius: 12px;
  max-width: 280px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  font-weight: 500;
}

.calc-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 12px 12px 16px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.06);
  max-width: 560px;
  margin: 12px auto;
}
.calc-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 10px;
}
@media (max-width: 480px) {
  .calc-row { grid-template-columns: 1fr; }
}
.calc-item {
  border-radius: 12px;
}
.calc-item.readonly {
  --background: #f7f7f7;
}
.calc-value { 
  width: 100%; 
  text-align: right; 
  font-weight: 600; 
  color: #2e7d32; 
  padding-right: 8px; 
}
.calc-result {
  text-align: center;
  background: #eef9ec;
  border: 2px solid #c8efc4;
  border-radius: 14px;
  padding: 16px;
  margin-top: 4px;
}
.calc-result .result-label { 
  font-size: 14px; 
  color: #2e7d32; 
  margin-bottom: 6px; 
}
.calc-result .result-value { 
  font-size: 28px; 
  font-weight: 800; 
  color: #1b5e20; 
}
.calc-result .unit { 
  font-size: 16px; 
  font-weight: 600; 
  margin-left: 4px; 
  color: #2e7d32; 
}
.calc-actions { 
  display: flex; 
  justify-content: flex-end; 
  margin-top: 10px; 
}

.impact-summary {
  background: #ffffff;
  border-radius: 14px;
  padding: 12px 14px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.06);
  max-width: 560px;
  margin: 12px auto 24px;
  text-align: left;
}
.impact-summary h3 {
  margin: 0 0 6px 0;
  color: #1b5e20;
}
.impact-summary .total { margin: 0 0 6px 0; }
.impact-summary .history {
  list-style: none;
  padding: 0;
  margin: 6px 0 0 0;
}
.impact-summary .history li {
  display: flex;
  gap: 6px;
  align-items: baseline;
  font-size: 14px;
  border-top: 1px dashed #e3e3e3;
  padding: 6px 0;
}
</style>
