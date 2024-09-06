<template>
  <div>
    <h1>CrossView : {{ textStore }}</h1>
    <input type="text" v-model="textStore" />

    <div>mouse: {{ x }}, {{ y }}</div>

    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div>{{ data.results[0].name }}</div>
      <div>{{ error }}</div>
    </div>
  </div>
</template>

<script setup>
import { textStore } from '../stores/refStore'


// const x = ref(0)
// const y = ref(0)

// function update(event) {
//   x.value = event.pageX
//   y.value = event.pageY
// }
// onMounted(() => window.addEventListener('mousemove', update))
// onUnmounted(() => window.removeEventListener('mousemove', update))

// 使用 composable
import { useMouse } from '../composable/useMouse'

const { x, y } = useMouse()



import { useFetch } from '../composable/useFetch'

const { data, error, isLoading } = useFetch('https://randomuser.me/api/')




</script>

<style scoped></style>