<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <!-- Wrapper principal -->
    <div class="w-full flex flex-col flex-grow">

      <!-- Header/Navbar -->
      <Navbar :username="username" :logout="logout" />

      <!-- Animated RouterView -->
      <main class="flex-grow max-w-7xl w-full mx-auto px-4 py-8">
        <motion-div
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 0.4 } }"
          :leave="{ opacity: 0, y: -20, transition: { duration: 0.2 } }"
        >
          <RouterView />
        </motion-div>
      </main>

      <!-- Footer -->
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

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

const logout = () => {
  localStorage.removeItem('jwt')
  localStorage.removeItem('user')
  username.value = ''
  router.push('/')
  setTimeout(() => window.location.reload(), 200)
}

onMounted(() => {
  fetchMe()
})
</script>
