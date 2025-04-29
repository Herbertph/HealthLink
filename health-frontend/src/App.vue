<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <div class="max-w-7xl mx-auto w-full flex flex-col flex-grow">

      <!-- Navbar -->
      <nav class="bg-blue-600 p-4 text-white flex justify-between">
        <div class="font-bold">
          Blue Health
        </div>
        <div class="flex items-center space-x-4">
          <RouterLink to="/" class="hover:underline">Home</RouterLink>

          <template v-if="username">
            <RouterLink to="/new" class="hover:underline">New Appointment</RouterLink>

            <div class="text-white font-semibold">
              Welcome, {{ username }}!
            </div>

            <button 
              @click="logout" 
              class="hover:underline text-white font-semibold"
            >
              Logout
            </button>
          </template>

          <template v-else>
            <RouterLink to="/register" class="hover:underline">Register</RouterLink>
            <RouterLink to="/login" class="hover:underline">Login</RouterLink>
          </template>
        </div>
      </nav>

      <!-- Conteúdo -->
      <main class="flex-grow px-4 py-8">
        <RouterView />
      </main>

      <!-- Footer -->
      <footer class="bg-blue-600 text-white text-center p-4 mt-8">
        &copy; 2025 Blue Health. All rights reserved.
      </footer>
      
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const username = ref('')
const router = useRouter()

const fetchMe = async () => {
  const token = localStorage.getItem('jwt')
  if (!token) {
    username.value = ''
    return
  }

  try {
    const response = await axios.get('http://localhost:1337/api/users/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    username.value = response.data.username
  } catch (error) {
    console.error('Error fetching user info:', error)
    username.value = ''
  }
}

const logout = async () => {
  localStorage.removeItem('jwt')
  localStorage.removeItem('user')
  username.value = ''

  if (router.currentRoute.value.path === '/') {
    await router.replace('/refresh')
    await router.replace('/')
  } else {
    router.push('/')
  }
}

onMounted(() => {
  fetchMe()
})
</script>

