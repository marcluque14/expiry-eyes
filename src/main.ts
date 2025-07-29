import { createApp } from 'vue';
import App from './App.vue';
import { IonicVue } from '@ionic/vue';
import router from './router';

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonModal,
  IonSpinner,
  IonButtons,
} from '@ionic/vue';
import { IonBackButton } from '@ionic/vue';

import '@ionic/vue/css/core.css';
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';
import './theme/variables.css';




const app = createApp(App)
  .use(IonicVue)
  .use(router);

// Registro global de componentes Ionic
app.component('IonPage', IonPage);
app.component('IonHeader', IonHeader);
app.component('IonToolbar', IonToolbar);
app.component('IonTitle', IonTitle);
app.component('IonContent', IonContent);
app.component('IonList', IonList);
app.component('IonItem', IonItem);
app.component('IonLabel', IonLabel);
app.component('IonInput', IonInput);
app.component('IonButton', IonButton);
app.component('IonModal', IonModal);
app.component('IonSpinner', IonSpinner);
app.component('IonButtons', IonButtons);
app.component('IonBackButton', IonBackButton);

router.isReady().then(() => {
  app.mount('#app');
});