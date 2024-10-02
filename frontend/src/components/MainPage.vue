<script setup lang="ts">

</script>

<template>
  <div class="container">
    <div>
    <h1 class="title">Bablo Kombat</h1>
    <p class="description">
      All your friends already playing, so what are you wating for?
    </p>
    <div class="buttons">
      <RouterLink to='/login' class="btn login-btn" >Login</RouterLink>
      <RouterLink to="/signup" class="btn signup-btn">Sign Up</RouterLink>
    </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75vh;
  padding: 2rem;
}

.description {
  font-size: 1.5rem;
  margin-bottom: 4rem;

}

.title {
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.btn {
  font-size: 1.2rem;
  padding: 10px 25px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.login-btn {
  background-color: #ffffff;
  color: #4a90e2;
}

.signup-btn {
  background-color: #ffffff;
  color: #9013fe;
}

.btn:hover {
  transform: scale(1.05);
  background-color: #f2f2f2;
}
</style>