<template>
  <div class="root">{{ title }}</div>
  <ul>
    <li><router-link to="/">Back</router-link></li>
    <li><router-link to="/home">Home</router-link></li>
    <li><router-link to="/about">About</router-link></li>
  </ul>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const title = ref('vue-ts')
</script>

<style scoped>
.root {
  font-size: 20px;
}
</style>
