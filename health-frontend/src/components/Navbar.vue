<template>
    <nav class="bg-blue-600 w-full p-4 text-white flex justify-between">
      <div class="font-bold">
        Blue Health
      </div>
      <div class="flex items-center space-x-4">
        <div v-if="username" class="text-white font-semibold">
          Welcome, {{ username }}!
        </div>
        <RouterLink to="/" class="hover:underline">Home</RouterLink>
  
        <button 
          v-if="username" 
          @click="logout" 
          class="hover:underline text-white font-semibold"
        >
          Logout
        </button>
  
        <RouterLink v-if="!username" to="/register" class="hover:underline">
          Register
        </RouterLink>
        <RouterLink v-if="!username" to="/login" class="hover:underline">
          Login
        </RouterLink>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { RouterLink } from 'vue-router'
  
  defineProps({
    username: String,
    logout: Function
  })
  </script>
  