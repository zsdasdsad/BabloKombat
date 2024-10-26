<script setup lang="ts">
import {ref, onMounted, onUnmounted, watch} from 'vue';
import axios from "axios";
import { useRouter } from "vue-router";
import { stopAutoClick, startAutoClick } from "./Upgrades/auto.ts";
import { startCrypto, stopCrypto } from "./Upgrades/crypto.ts";


const UserId = localStorage.getItem('UserId');
const ClickCounter = ref(0);
const Upgrades = ref({
  click: { level: 0, cost: 100 },
  auto: { level: 0, cost: 500 },
  crypto: { level: 0, cost: 1000 },
  manager: { level: 0, cost: 10000 },
  bank: { level: 0, cost: 100000 },
  factory: { level: 0, cost: 1000000 },
});
const image = ref(new URL('../../assets/Default.png', import.meta.url).href);
const router = useRouter();

function upgradeCostCalculate(upgrade) {
  return Upgrades.value[upgrade].cost * (1 + Upgrades.value[upgrade].level * 0.2);
}

axios.post('http://localhost:3000/db/info', { userId: UserId }).then((response) => {
  ClickCounter.value = response.data.bablo;
  Upgrades.value.click.level = response.data.upgrades.click;
  Upgrades.value.auto.level = response.data.upgrades.auto;
  Upgrades.value.crypto.level = response.data.upgrades.crypto;
  Upgrades.value.manager.level = response.data.upgrades.manager;
  Upgrades.value.bank.level = response.data.upgrades.bank;
  Upgrades.value.factory.level = response.data.upgrades.factory;

  Upgrades.value.click.cost = upgradeCostCalculate('click').toFixed(0);
  Upgrades.value.auto.cost = upgradeCostCalculate('auto').toFixed(0);
  Upgrades.value.crypto.cost = upgradeCostCalculate('crypto').toFixed(0);
  Upgrades.value.manager.cost = upgradeCostCalculate('manager').toFixed(0);
  Upgrades.value.bank.cost = upgradeCostCalculate('bank').toFixed(0);
  Upgrades.value.factory.cost = upgradeCostCalculate('factory').toFixed(0);
});

function handleSave() {
  axios.post('http://localhost:3000/db/saveBablo', { userId: UserId, bablo: ClickCounter.value }).then((response) => {
    setTimeout(handleSave, 2000);
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
  }, 100);
  ClickCounter.value += Upgrades.value.click.level+1;
}

function upgrade(upgrade) {
  axios.post('http://localhost:3000/db/upgrade', { userId: UserId, upgrade: upgrade }).then((response) => {
    if (response.data.success === true) {
      ClickCounter.value = response.data.current_balance;
      Upgrades.value[upgrade].level = response.data.new_lvl;
      Upgrades.value[upgrade].cost = response.data.new_cost.toFixed(0);
    } else {
      const button = document.querySelector(`button[title="${upgrade}"]`);
      if (button) {
        button.classList.add('shake');
        setTimeout(() => {
          button.classList.remove('shake');
        }, 500);
      }
    }
  });
}

function multiplyBalance(multiplier: number) {
  ClickCounter.value *= multiplier;
}


function logout() {
  localStorage.removeItem('UserId');
  localStorage.removeItem('token');
  router.push('/login');
}

onMounted(() => {
  document.body.style.overflow = 'hidden';
  startAutoClick(Upgrades.value.auto.level, handleClick)
  startCrypto(Upgrades.value.crypto.level, multiplyBalance)
});

onUnmounted(() => {
  document.body.style.overflow = '';
  stopAutoClick()
  stopCrypto()
});

watch(() => Upgrades.value.auto.level, (newLevel) => {
  stopAutoClick();
  startAutoClick(newLevel, handleClick);
});
watch(() => Upgrades.value.crypto.level, (newLevel) => {
  stopCrypto();
  startCrypto(newLevel, multiplyBalance);
});
</script>

<template>
  <div class="grid_container">
    <div class="side_container">
      <button @click="upgrade('click')" class="side_button" title="click">
        Bablo per click<br>
        Level: {{ Upgrades.click.level }}<br>
        Cost: {{ Upgrades.click.cost }}
      </button>
      <button @click="upgrade('auto')" class="side_button" title="auto">
        Auto click<br>
        Level: {{ Upgrades.auto.level }}<br>
        Cost: {{ Upgrades.auto.cost }}
      </button>
      <button @click="upgrade('crypto')" class="side_button" title="crypto">
        Crypto investment<br>
        Level: {{ Upgrades.crypto.level }}<br>
        Cost: {{ Upgrades.crypto.cost }}
      </button>
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
      <button @click="upgrade('manager')" class="side_button" title="manager">
        Manager<br>
        Level: {{ Upgrades.manager.level }}<br>
        Cost: {{ Upgrades.manager.cost }}
      </button>
      <button @click="upgrade('bank')" class="side_button" title="bank">
        Bank<br>
        Level: {{ Upgrades.bank.level }}<br>
        Cost: {{ Upgrades.bank.cost }}
      </button>
      <button @click="upgrade('factory')" class="side_button" title="factory">
        Factory<br>
        Level: {{ Upgrades.factory.level }}<br>
        Cost: {{ Upgrades.factory.cost }}
      </button>
      <button @click="logout" class="logout_button">Logout</button>
    </div>
  </div>
</template>


<style scoped>
.grid_container {
  display: grid;
  grid-template-columns: 1fr 350px 1fr;
  gap: 100px;
}

.side_container {
  display: grid;
  grid-template-rows: repeat(3, auto);
  justify-content: center;
  align-content: center;
  gap: 20px;
}

.side_button {
  width: 200px;
  text-align: center;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background-color: #4CAF50;
  color: white;
  font-size: 16px;
  transition: background-color 0.3s, transform 0.2s;
  cursor: pointer;
}

.side_button:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

.counter {
  text-align: center;
  font-size: 30px;
  font-weight: 400;
}

.counter_container {
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
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.logout_button {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.logout_button:hover {
  background-color: #e53935;
  transform: scale(1.05);
}
</style>
