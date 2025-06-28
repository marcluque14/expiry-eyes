import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue';
import Home from '../views/Home.vue';
import MapView from '../views/MapView.vue';
import Profile from '../views/Profile.vue';
import Login from '../views/Login.vue';

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      { path: 'home', component: Home },
      { path: 'map', component: MapView },
      { path: 'profile', component: Profile }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;