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
      { path: 'profile', component: Profile },
      { path: 'notifications', component: () => import('@/views/Notifications.vue') },
      { path: 'cart', component: () => import('@/views/Cart.vue') },
      // Aquí añades la ruta nueva:
      { path: 'payment-methods', component: () => import('@/views/PaymentMethods.vue') }
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

// Guardia para controlar rutas privadas
router.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  // También aceptar rutas públicas que empiecen por /login (ejemplo: /login/otra)
  const isPublic = publicPages.some(page => to.path.startsWith(page));
  
  const token = localStorage.getItem('expiry-eyes-token');
  const loggedIn = token && token.length > 10;

  if (!isPublic && !loggedIn) {
    // Si no estás logueado y la ruta no es pública, redirige a login
    return next('/login');
  }

  next();
});

export default router;