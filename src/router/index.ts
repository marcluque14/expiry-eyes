import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue';
import Home from '../views/Home.vue';
import MapView from '../views/MapView.vue';
import Profile from '../views/Profile.vue';
import Login from '../views/Login.vue';
import HomeEmpresa from '../views/HomeEmpresa.vue';
import Signup from '../views/Signup.vue';
import EditProfile from '../views/EditProfile.vue';
import Ayuntamientos from '../views/Ayuntamientos.vue';
import Impacto from '../views/Impacto.vue';
import Unete from '../views/Unete.vue';

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
    path: '/oauth/google/callback',
    name: 'GoogleCallback',
    component: () => import('@/views/GoogleCallback.vue'),
  },
  {
    path: '/signup',
    component: Signup,
  },
  {
    path: '/editprofile',
    component: EditProfile
  },
  {
    path: '/editprofile/:id',
    name: 'EditProfile',
    component: () => import('@/views/EditProfile.vue')
  },
  {
    path: '/oauth/callback',
    component: () => import('@/views/OAuthCallback.vue')
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
      { path: 'payment-methods', component: () => import('@/views/PaymentMethods.vue') }
    ]
  },
  {
    path: '/colegio/:colegio',
    name: 'SchoolProducts',
    component: () => import('@/views/SchoolProducts.vue')
  },
  {
    path: '/ofertas',
    component: () => import('../views/Ofertas.vue')
  },
  {
    path: '/producto/:product_id',
    name: 'ProductDetails',
    component: () => import('@/views/ProductDetails.vue')
  },
  {
    path: '/ayuntamientos',
    component: Ayuntamientos,
    meta: { requiresAuth: true }
  },
  {
    path: '/unete',
    component: Unete,
    meta: { requiresAuth: true }
  },
  {
    path: '/impacto',
    component: Impacto,
    meta: { requiresAuth: true }
  },
  {
    path: '/proyectos',
    component: () => import('@/views/Proyectos.vue'),
    meta: { requiresAuth: true }
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
  const publicPages = ['/login', '/signup', '/oauth/google/callback'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = !!localStorage.getItem('expiry-eyes-token');
  const user = loggedIn; // Assuming loggedIn indicates user presence

  if (to.meta.requiresAuth && !user && to.path !== '/editprofile') {
    next('/login');
  } else if (authRequired && !loggedIn) {
    return next('/login');
  } else {
    next();
  }
});

export default router;