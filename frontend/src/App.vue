<script setup lang="ts">
import { RouterView } from 'vue-router'

// Dark mode
const root = document.getElementsByTagName('html')[0]
root.setAttribute('class', 'dark')
</script>

<template>
  <RouterView />
</template>
