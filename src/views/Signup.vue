<template>
  <ion-page>
    <ion-content class="ion-padding login-container" fullscreen>
      <div class="login-box">
        <div class="logo-container">
          <img src="@/assets/logo.png" alt="Logo ExpiryEyes" class="expiryeyes-logo" />
        </div>
        <h2>Regístrate gratis</h2>
        <p>Crea una cuenta para empezar a explorar.</p>

        <form @submit.prevent="submitForm" novalidate class="signup-form">
          <div class="form-group">
            <label for="name">Nombre</label>
            <input
              id="name"
              type="text"
              v-model="name"
              placeholder="Tu nombre (opcional)"
            />
          </div>
          <div class="form-group">
            <label for="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              v-model="email"
              placeholder="Introduce tu correo electrónico"
              required
            />
          </div>

          <div class="form-group">
            <label for="password">Contraseña</label>
            <input
              id="password"
              type="password"
              v-model="password"
              placeholder="********"
              required
            />
          </div>

          <button type="submit" class="sign-up-button" :disabled="isLoading">
            Registrar
          </button>
        </form>

        <div class="or-divider">O</div>

        <div class="social-login-buttons" style="margin-left: 10px;">
          <button type="button" class="social-btn apple-btn" @click="signInWithApple">
            <img src="@/assets/apple.jpeg" alt="Apple" />
          </button>
          <button type="button" class="social-btn google-btn" @click="signInWithGoogle">
            <img src="@/assets/google.jpg" alt="Google" />
          </button>
        </div>

        <div class="already-account">
          ¿Ya tienes cuenta? 
          <button type="button" class="sign-in-link" @click="goToLogin">Inicia sesión</button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
const XANO_AUTH_BASE = import.meta.env.VITE_XANO_AUTH_BASE || '';
const XANO_API_BASE = import.meta.env.VITE_XANO_API_BASE || '';
const XANO_OAUTH_BASE = import.meta.env.VITE_XANO_OAUTH_BASE || XANO_AUTH_BASE || '';

const name = ref('');
const email = ref('');
const password = ref('');
const isLoading = ref(false);
const router = useRouter();

function saveSession(token: string) {
  localStorage.setItem('expiry-eyes-token', token);
}

async function submitForm() {
  if (!email.value || !password.value) {
    alert('Por favor, completa todos los campos');
    return;
  }
  if (password.value.length < 8) {
    alert('La contraseña debe tener al menos 8 caracteres');
    return;
  }
  isLoading.value = true;

  if (!XANO_AUTH_BASE) {
    alert('Falta configurar VITE_XANO_AUTH_BASE con el grupo que tiene /auth/signup en Xano.');
    isLoading.value = false;
    return;
  }
  try {
    const response = await axios.post(`${XANO_AUTH_BASE}/auth/signup`, {
      email: email.value,
      password: password.value,
      ...(name.value ? { name: name.value } : {})
    });

    if (response.data && response.data.authToken) {
      saveSession(response.data.authToken);
      alert('Usuario registrado con éxito!');
      try {
        const meRes = await axios.get(`${XANO_AUTH_BASE}/auth/me`, {
          headers: { Authorization: `Bearer ${response.data.authToken}` }
        });
        if (meRes.data && meRes.data.id) {
          localStorage.setItem('user_id', meRes.data.id);
          if (meRes.data.role) {
            localStorage.setItem('user_role', meRes.data.role);
          }
        }
      } catch {}
      router.push('/tabs/home');
    } else {
      alert('No se pudo registrar. Inténtalo de nuevo.');
    }
  } catch (error: any) {
    const msg = error?.response?.data?.message || error?.message || 'Error desconocido';
    let friendly = msg;
    if (/workspace no longer exists/i.test(msg)) {
      friendly = 'Problema de configuración en Xano: la Base URL de la API no es válida.';
    } else if (/email/i.test(msg) && /(exists|registrado|duplicate|already)/i.test(msg)) {
      friendly = 'Ese correo ya está registrado. Prueba a iniciar sesión o usa otro correo.';
    } else if (/password/i.test(msg) && /(short|mínimo|minimo|length)/i.test(msg)) {
      friendly = 'La contraseña no cumple los requisitos mínimos.';
    }
    alert('Error al registrar usuario: ' + friendly);
  } finally {
    isLoading.value = false;
  }
}

function signInWithApple() {
  alert('Funcionalidad Apple Login pendiente de implementar');
}

async function signInWithGoogle() {
  if (!XANO_OAUTH_BASE) {
    alert('Falta configurar VITE_XANO_OAUTH_BASE (o VITE_XANO_AUTH_BASE) con el grupo que tiene /oauth/google/init.');
    return;
  }
  try {
    const res = await axios.get(`${XANO_OAUTH_BASE}/oauth/google/init`, {
      params: {
        redirect_uri: 'http://localhost:5173/oauth/google/callback'
      }
    });
    if (res.data && res.data.authUrl) {
      window.location.href = res.data.authUrl;  // Redirige a Google
    } else {
      alert('Error al obtener URL de autenticación Google');
    }
  } catch (error) {
    alert('Error en login Google');
    console.error(error);
  }
}

function goToLogin() {
  router.push('/login');
}
</script>

<style scoped>
/* Tus estilos originales aquí */

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f6f8fa;
}

.login-box {
  background-color: white;
  padding: 2rem 2.5rem;
  width: 360px;
  border-radius: 16px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.logo-container {
  margin: 0 auto 1.5rem;
  width: 60px;
  height: 60px;
}

.expiryeyes-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

h2 {
  margin: 0;
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 8px;
}

p {
  color: #666;
  margin-bottom: 1.5rem;
  font-size: 14px;
}

.signup-form {
  text-align: left;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 0.25rem;
  display: block;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border: 1.5px solid #d1d5db;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.3s ease;
  color: white;
  background-color: #000000;
}

.form-group input:focus {
  border-color: #0a84ff;
  box-shadow: 0 0 0 2px rgba(253, 251, 251, 0.25);
}

.sign-up-button {
  width: 100%;
  height: 48px;
  background-color: black;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.sign-up-button:disabled {
  background-color: #444;
  cursor: not-allowed;
}

.or-divider {
  text-align: center;
  margin: 1rem 0;
  font-weight: 600;
  color: #666;
}

.social-login-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.social-btn {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  border: 1px solid #d1d5db;
  background: white;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.social-btn img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.social-btn.apple-btn img {
  border-radius: 8px;
}

.already-account {
  text-align: center;
  font-size: 0.9rem;
  color: #444;
}

.sign-in-link {
  background: none;
  border: none;
  color: #0a84ff;
  cursor: pointer;
  font-weight: 600;
  padding: 0;
  margin-left: 0.25rem;
  font-size: 0.9rem;
  text-decoration: underline;
}
</style>