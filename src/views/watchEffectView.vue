<template>
  <div>
    watchEffect
  </div>
  <input type="text" v-model="name" />
  <input type="text" v-model="money" />
</template>

<script setup>
// computed
// 1. 自動監聽
// 2. 不修改監聽的值


// watch
// 1. 手動監聽
// 2. 可以修改監聽的值，類似觸發一個函式

// watchEffect
// 1. 自動監聽
// 2. 可以修改監聽的值，類似觸發一個函式

import { ref, watchEffect, watch } from 'vue';

// 從 localStorage 讀取
const localData = JSON.parse(localStorage.getItem('vue-data')) || '{}';
console.log('localData', localData);


const name = ref(localData.name);
const money = ref(localData.money);

// 儲存到 localStorage
watchEffect(() => {
  const data = {
    name: name.value,
    money: money.value
  };
  console.log(data);
  localStorage.setItem('vue-data', JSON.stringify(data));
});

// 如果是 watch 監聽name , money的寫法
watch(name, (newVal, oldVal) => {
  console.log('name', newVal, oldVal);
});

watch(money, (newVal, oldVal) => {
  console.log('money', newVal, oldVal);
});




</script>

<style lang="scss" scoped></style>