<template>
  <div class="p-6">
    <!-- Hero Section -->
    <div class="text-center my-12">
      <h1 class="text-4xl font-bold text-blue-700 mb-4">Welcome to Blue Health</h1>
      <p class="text-gray-600 text-lg">
        Manage your medical appointments easily and efficiently.
      </p>
    </div>

    <!-- Create Appointment Button -->
    <div class="flex justify-center mb-8" v-if="isLoggedIn">
      <RouterLink 
        to="/new" 
        class="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition"
      >
        Create Appointment
      </RouterLink>
    </div>

    <!-- Appointments List -->
    <div v-if="appointments.length > 0" class="grid gap-6 md:grid-cols-2">
      <motion-div
        v-for="appointment in appointments"
        :key="appointment.id"
        class="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
        v-motion="{
          initial: { opacity: 0, y: 20 },
          enter: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300 } }
        }"
      >
        <h2 class="text-2xl font-semibold mb-2 text-blue-700">{{ appointment.doctorName }}</h2>
        <p class="text-gray-600"><strong>Date:</strong> {{ formatDate(appointment.date) }}</p>
        <p class="text-gray-600"><strong>Reason:</strong> {{ appointment.reason || 'Not provided' }}</p>

        <div class="flex gap-4 mt-6">
          <router-link 
            :to="`/appointment/edit/${appointment.documentIdd}`" 
            class="bg-yellow-400 text-white py-2 px-4 rounded hover:bg-yellow-500"
          >
            Edit
          </router-link>

          <button 
            @click="deleteAppointment(appointment.id)"
            class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </motion-div>
    </div>

    <!-- No Appointments Message + Image -->
    <div v-else class="text-center mt-16">
      <p class="text-lg text-gray-600 mb-4">No appointments scheduled yet.</p>
      
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useMotion } from '@vueuse/motion'

const appointments = ref([])
const isLoggedIn = ref(false)

const fetchAppointments = async () => {
  try {
    const token = localStorage.getItem('jwt')
    if (!token) {
      appointments.value = []
      return
    }

    const response = await axios.get('http://localhost:1337/api/appointments', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    console.log('API Response:', response.data)
    appointments.value = response.data.data
  } catch (error) {
    console.error('Error fetching appointments:', error)
    appointments.value = []
  }
}

const deleteAppointment = async (id) => {
  try {
    const token = localStorage.getItem('jwt')
    if (!token) return

    await axios.delete(`http://localhost:1337/api/appointments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    setTimeout(() => {
      window.location.reload()
    }, 300)
  } catch (error) {
    console.error('Error deleting appointment:', error)
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'Unknown date'
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

onMounted(() => {
  fetchAppointments()
  const token = localStorage.getItem('jwt')
  isLoggedIn.value = !!token
})
</script>
