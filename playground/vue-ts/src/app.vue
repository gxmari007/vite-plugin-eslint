<template>
  <div class="root">{{ title }}</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const title = ref('vue-ts')
</script>

<style scoped>
.root {
  font-size: 18px;
}
</style>
