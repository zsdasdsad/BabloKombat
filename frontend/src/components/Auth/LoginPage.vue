<script setup lang="ts">
  import axios from 'axios';
  import {onMounted, ref} from 'vue';
  import { useRouter } from 'vue-router';

  const username = ref('');
  const password = ref('');
  const router = useRouter();

  function handleLogin() {
    axios.post('http://localhost:3000/auth/login', {
      username: username.value,
      password: password.value,
    })
        .then((response) => {
          if (response.data.success) {
            router.push('/game');
            const UserId = response.data.userId;
            const token = response.data.token;
            localStorage.setItem('UserId', UserId);
            localStorage.setItem('token', token);
            console.log(response.data);
          } else {
            console.error('Login failed:', response.data.message);
          }
        })
        .catch((error) => {
          console.error('Error during login:', error);
        });
  }

  async function fetchData() {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    try {
      const response = await axios.get('http://localhost:3000/auth/status', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      localStorage.setItem('UserId', response.data.userId);
      router.push('/game');

    } catch (error) {
      return error;
    }
  }


  onMounted(() => {
    fetchData();
  });
</script>

<template>
  <div class="login-container">
    <h1>Log in</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <input type="username" id="username" placeholder="Username" v-model="username" required />
      </div>
      <div class="form-group">
        <input type="password" id="password" placeholder="Password" v-model="password" required />
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