import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue';
import Login from '../views/Login.vue';
import HomeEmpresa from '../views/HomeEmpresa.vue';

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
    path: '/home-empresa',
    component: HomeEmpresa,
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      { path: '', redirect: '/tabs/home' },
      { path: 'home', component: () => import('../views/Home.vue') },
      { path: 'MapView', component: () => import('../views/MapView.vue') },
      { path: 'profile', component: () => import('../views/Profile.vue') },
      { path: 'cart', component: () => import('../views/Cart.vue') },
      { path: 'notifications', component: () => import('../views/Notifications.vue') }
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