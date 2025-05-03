<template>
  <div class="min-h-screen p-6 bg-gray-100">
    <!-- Hero Section -->
    <div class="text-center mb-6 mt-12">
      <h1 class="text-4xl font-bold text-blue-700 mb-4">Welcome to Blue Health</h1>
      <p class="text-gray-600 text-lg">
        Manage your medical appointments easily and efficiently.
      </p>
    </div>

    <!-- Create Appointment Button -->
    <div
      class="flex justify-center mb-10"
      v-if="isLoggedIn && appointments.length > 0"
    >
      <RouterLink
        to="/new"
        class="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 shadow-md transition"
      >
        <i class="fa-regular fa-calendar-plus mr-2"></i> Create Appointment
      </RouterLink>
    </div>

    <!-- Appointments Grid -->
    <div v-if="appointments.length > 0" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <AppointmentCard
        v-for="appointment in appointments"
        :key="appointment.id"
        :appointment="appointment"
        :formatDate="formatDate"
        @delete="deleteAppointment"
      />
    </div>

    <!-- Empty Card Centralizado -->
    <div
      v-else
      class="flex items-center justify-center min-h-[60vh]"
    >
      <div class="bg-white rounded-xl border border-dashed border-gray-300 p-6 text-center text-gray-500 flex flex-col justify-center items-center">
        <i class="fa-regular fa-calendar-plus text-4xl mb-4"></i>
        <p class="mb-4">No more appointments scheduled</p>

        <!-- Só aparece se estiver logado -->
        <RouterLink
          v-if="isLoggedIn"
          to="/new"
          class="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 text-sm"
        >
          Add New Appointment
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useMotion } from '@vueuse/motion'
import AppointmentCard from '../components/AppointmentCard.vue'

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

    appointments.value = response.data.data.map(item => ({
      id: item.id,
      documentId: item.documentId,
      doctorName: item.doctorName,
      date: item.date,
      reason: item.reason,
      status: item.status || '',
      specialty: item.specialty || '',
    }))
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
