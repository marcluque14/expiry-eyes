import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue';
import Home from '../views/Home.vue';
import MapView from '../views/MapView.vue';
import Profile from '../views/Profile.vue';
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
      { path: 'home', component: Home },
      { path: 'mapview', component: MapView },
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
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/login'
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log('Navegando a:', to.path);
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const token = localStorage.getItem('expiry-eyes-token');
  const loggedIn = token && token.length > 10;  // Token no vacío y razonablemente largo
  console.log('Autenticación requerida:', authRequired, 'Usuario logueado:', loggedIn);

  if (authRequired && !loggedIn) {
    return next('/login');
  }
  next();
});

export default router;