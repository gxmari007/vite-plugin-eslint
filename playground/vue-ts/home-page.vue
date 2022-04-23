<template>
  <div class="root">{{ title }}</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const title = ref('Home page')
</script>

<style scoped>
.root {
  font-size: 14px;
}
</style>
