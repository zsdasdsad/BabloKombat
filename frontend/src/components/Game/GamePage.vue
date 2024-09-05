<script setup lang="ts">
import { ref } from 'vue';

const image = ref(new URL('../../assets/Default.png', import.meta.url).href);
const ClickCounter = ref(0)

function handleClick() {
  image.value = new URL('../../assets/Clicked.png', import.meta.url).href;
  setTimeout(() => {
    image.value = new URL('../../assets/Default.png', import.meta.url).href;
  }, 100);
  ClickCounter.value++;

}
</script>

<template>
  <div class="container">
    <button @click="handleClick" class="image-button">
      <img :src="image" alt="Clickable Image" class="image">
    </button>
    <p>Bablo: {{ ClickCounter }}</p>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.image-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.image {
  width: 350px;
  height: auto;
}
</style>