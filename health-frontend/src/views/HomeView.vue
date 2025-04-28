<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6 text-blue-700">Appointments List</h1>

    <div v-if="appointments.length === 0">
      No appointments scheduled yet.
    </div>

    <div v-for="appointment in appointments" :key="appointment.id" class="bg-white p-6 rounded-lg shadow-md">
  <h2 class="text-xl font-semibold mb-2">{{ appointment.doctorName }}</h2>
  <p><strong>Date:</strong> {{ formatDate(appointment.date) }}</p>
  <p><strong>Reason:</strong> {{ appointment.reason || 'Not provided' }}</p>
  <router-link :to="`/appointment/${appointment.documentId}`">View Details</router-link>
</div>

    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const appointments = ref([])

const fetchAppointments = async () => {
  try {
    const response = await axios.get('http://localhost:1337/api/appointments')
    console.log('API Response:', response.data)
    appointments.value = response.data.data
  } catch (error) {
    console.error('Error fetching appointments:', error)
  }
}

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
  return new Date(dateString).toLocaleDateString('pt-BR', options)
}

onMounted(() => {
  fetchAppointments()
})
</script>
