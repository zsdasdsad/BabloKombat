<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import axios from "axios";

const UserId = localStorage.getItem('UserId');
const ClickCounter = ref(0)
const image = ref(new URL('../../assets/Default.png', import.meta.url).href);
console.log(image.value);

axios.post('http://localhost:3000/db/clicks', {userId:UserId}).then((response) => {
    ClickCounter.value = response.data.bablo;
});

function handleSave() {
  axios.post('http://localhost:3000/db/saveBablo', {userId:UserId, bablo: ClickCounter.value}).then((response) => {
    setTimeout(handleSave, 2000)
  });
}

const isClicked = ref(false);
function handleClick() {
  if (isClicked.value === false) {
    handleSave();
    isClicked.value = true;
  }
  image.value = new URL('../../assets/Clicked.png', import.meta.url).href;
  setTimeout(() => {
    image.value = new URL('../../assets/Default.png', import.meta.url).href;
    console.log(image.value);
  }, 100);
  ClickCounter.value++;
}

onMounted(() => {
  document.body.style.overflow = 'hidden';
});

onUnmounted(() => {
  document.body.style.overflow = '';
});

</script>

<template>
  <div class="grid_container">
    <div class="side_container">
      <button class="side_button" title="Increases your click x2">Bablo per click</button>
      <button class="side_button" title="Auto click every 10 second">Auto click</button>
      <button class="side_button" title="Gives 1/10 of your current balance every 5 minutes">Crypto investment</button>
    </div>
    <div class="counter_container">
      <p class="counter">Bablo: {{ ClickCounter }}</p>
      <button
          @click="handleClick"
          class="image-button"
          :style="{ backgroundImage: `url(${image})` }">
      </button>
    </div>
    <div class="side_container">
      <button class="side_button">Manager</button>
      <button class="side_button">Bank</button>
      <button class="side_button">Factory</button>
    </div>
  </div>
</template>

<style scoped>

.grid_container{
  display: grid;
  grid-template-columns: 1fr 350px 1fr;
  gap: 100px;
}

.side_container{
  display: grid;
  grid-template-rows: repeat(3, 40px);
  justify-content: center;
  align-content: center;
  gap: 100px;
}

.side_button{
  width: 200px;
}

.counter{
  text-align: center;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.counter_container{
  width: 350px;
}

.image-button {
  background-size: cover;
  background-image: url("../../assets/Default.png");
  width: 350px;
  height: 464px;
  border: none;
  padding: 0;
  cursor: pointer;
  position: relative;
}

</style>