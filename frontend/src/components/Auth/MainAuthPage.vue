<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();

function handleRegister() {
  console.log('Registering:', { username: username.value, email: email.value, password: password.value });
  router.push('/login');
}
</script>

<template>
  <div class="register-container">
    <h1>Sign up</h1>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <input type="text" id="username" placeholder="Username" v-model="username" required />
      </div>
      <div class="form-group">
        <input type="email" id="email" placeholder="Email" v-model="email" required />
      </div>
      <div class="form-group">
        <input type="password" id="password" placeholder="Password" v-model="password" required />
      </div>
      <button type="submit">Sign up</button>
    </form>
    <p>Already have an account? <RouterLink to="/login">Log in</RouterLink></p>
  </div>
</template>

<style scoped>
.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
  width: 100%;
  max-width: 400px;
}

input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  box-sizing: border-box;
}

button {
  padding: 0.5rem 1rem;
  cursor: pointer;
  width: 50%;
  box-sizing: border-box;
}
</style>