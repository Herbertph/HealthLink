import { useRouter } from 'vue-router'

<template>
    <div class="p-6 max-w-md mx-auto">
      <h1 class="text-3xl font-bold mb-6 text-blue-700">Register</h1>
  
      <form @submit.prevent="register" class="space-y-6">
        <div>
          <label class="block mb-2 font-semibold">Username</label>
          <input v-model="username" type="text" class="w-full p-2 border rounded-md" required />
        </div>
  
        <div>
          <label class="block mb-2 font-semibold">Email</label>
          <input v-model="email" type="email" class="w-full p-2 border rounded-md" required />
        </div>
  
        <div>
          <label class="block mb-2 font-semibold">Password</label>
          <input v-model="password" type="password" class="w-full p-2 border rounded-md" required />
        </div>
  
        <div>
          <label class="block mb-2 font-semibold">Confirm Password</label>
          <input v-model="confirmPassword" type="password" class="w-full p-2 border rounded-md" required />
        </div>
  
        <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Register
        </button>
      </form>
  
      <div v-if="successMessage" class="mt-4 text-green-600 font-semibold">
        {{ successMessage }}
      </div>
  
      <div v-if="errorMessage" class="mt-4 text-red-600 font-semibold">
        {{ errorMessage }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router' // 🔥 IMPORTAR AQUI
  import axios from 'axios'
  
  const username = ref('')
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const successMessage = ref('')
  const errorMessage = ref('')
  
  const router = useRouter()
  
  const register = async () => {
    if (password.value !== confirmPassword.value) {
      errorMessage.value = 'Passwords do not match.'
      successMessage.value = ''
      return
    }
  
    try {
      const response = await axios.post('http://localhost:1337/api/auth/local/register', {
        username: username.value,
        email: email.value,
        password: password.value
      })
      console.log('Register success:', response.data)
      successMessage.value = 'Registration successful! Redirecting to login...'
      errorMessage.value = ''
  
      username.value = ''
      email.value = ''
      password.value = ''
      confirmPassword.value = ''
  
      setTimeout(() => {
        router.push('/login')
      }, 1500)
    } catch (error) {
      console.error('Register error:', error)
      errorMessage.value = 'Registration failed. Please try again.'
      successMessage.value = ''
    }
  }
  </script>
  