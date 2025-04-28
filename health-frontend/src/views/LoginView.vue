
<template>
    <div class="p-6 max-w-md mx-auto">
      <h1 class="text-3xl font-bold mb-6 text-blue-700">Login</h1>
  
      <form @submit.prevent="login" class="space-y-6">
        <div>
          <label class="block mb-2 font-semibold">Identifier (email or username)</label>
          <input v-model="identifier" type="text" class="w-full p-2 border rounded-md" required />
        </div>
  
        <div>
          <label class="block mb-2 font-semibold">Password</label>
          <input v-model="password" type="password" class="w-full p-2 border rounded-md" required />
        </div>
  
        <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Login
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
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  const identifier = ref('')
  const password = ref('')
  const successMessage = ref('')
  const errorMessage = ref('')
  
  const router = useRouter()

const login = async () => {
  try {
    const response = await axios.post('http://localhost:1337/api/auth/local', {
      identifier: identifier.value,
      password: password.value
    })
    console.log('Login success:', response.data)

    localStorage.setItem('jwt', response.data.jwt)

    successMessage.value = 'Login successful! Redirecting to Home...'
    errorMessage.value = ''

    identifier.value = ''
    password.value = ''

    setTimeout(() => {
      router.push('/')
    }, 1500)
  } catch (error) {
    console.error('Login error:', error)
    errorMessage.value = 'Login failed. Please check your credentials.'
    successMessage.value = ''
  }
}
  </script>
  