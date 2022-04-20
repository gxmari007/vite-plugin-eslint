<template>
  <div class="root">{{ title }}</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const title = ref('Vue Playground')
</script>

<style scoped>
.root {
  font-size: 18px;
}
</style>
