<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function handleLogin() {
  console.log('Logging in');
  router.push('/game');
}
</script>

<template>
  <div class="login-container">
    <h1>Log in</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <input type="email" id="email" placeholder="Email" required />
      </div>
      <div class="form-group">
        <input type="password" id="password" placeholder="Password" required />
      </div>
      <button type="submit">Log in</button>
    </form>
    <p>Don't have an account? <RouterLink to="/signup">Sign up</RouterLink></p>
  </div>
</template>

<style scoped>
.login-container {
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