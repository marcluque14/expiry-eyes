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
      { path: '', redirect: '/tabs/home' },
      { path: 'home', component: Home },
      { path: 'MapView', component: MapView },
      { path: 'profile', component: Profile }
    ]
  },
  {
    path: '/ofertas',
    component: () => import('../views/Ofertas.vue')
  },
  {
    path: '/product-details',
    name: 'ProductDetails',
    component: () => import('@/views/ProductDetails.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;