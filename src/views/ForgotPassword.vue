<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="form-group">
        <label for="email">Correu electrònic</label>
        <input id="email" type="email" v-model="username" placeholder="Introduceix el teu correu electrònic" />
      </div>

      <div class="form-group">
        <label for="password">Contrasenya</label>
        <input id="password" type="password" v-model="password" placeholder="Introdueix la teva contrasenya" />
      </div>
      <ion-button expand="block" @click="login">Login</ion-button>
    </ion-content>
  </ion-page>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      // login logic here
    }
  }
};
</script>  

<style scoped>
.form-group {
  margin-bottom: 1rem;
  text-align: left;
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
}

.form-group input:focus {
  border-color: #0a84ff;
  box-shadow: 0 0 0 2px rgba(10, 132, 255, 0.25);
}
</style>
