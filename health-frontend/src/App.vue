<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-blue-600 p-4 text-white flex justify-between">
      <div class="font-bold text-lg">Blue Health</div>
      <div class="space-x-4">
        <RouterLink to="/" class="hover:underline">Home</RouterLink>
        <RouterLink to="/new" class="hover:underline">New Appointment</RouterLink>
      </div>
    </nav>
    <RouterView />
  </div>
</template>

<style scoped>

</style>
