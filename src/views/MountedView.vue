<template>
  <div>
    <h1>Mounted</h1>
    <div v-for="item in data" :key="item.id">
      <p>{{ item.title }}</p>
    </div>
    <input type="text" v-model="title" ref="inputRef" />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import axios from 'axios';

const { VITE_URL, VITE_PATH } = import.meta.env;

const data = ref();
const title = ref('');

onMounted(async () => {
  const res = await axios.get(`${VITE_URL}/api/${VITE_PATH}/products`);

  data.value = res.data.products;
  console.log(data.value);
});

const inputRef = ref(null);
onMounted(() => {
  console.log(inputRef.value);
  inputRef.value.value = title.value;
  console.log(inputRef.value.value);
});

watch(title, (newVal, oldVal) => {
  console.log(newVal, oldVal);
});
</script>

<style lang="scss" scoped></style>