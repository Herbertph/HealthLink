<template>
    <div class="p-6">
      <h1 class="text-3xl font-bold mb-6 text-blue-700">Appointment Details</h1>
  
      <div v-if="appointment" class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-4">{{ appointment.doctorName }}</h2>
        <p><strong>Date:</strong> {{ formatDate(appointment.date) }}</p>
        <p class="mt-2"><strong>Reason:</strong> {{ appointment.reason || 'Not provided' }}</p>
        <p class="mt-2"><strong>Status:</strong> {{ appointment.statusC || 'Pending' }}</p>
      </div>
  
      <div v-else>
        Loading appointment details...
      </div>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const appointment = ref(null)

const fetchAppointment = async () => {
  try {
    // Buscando pelo documentId como filtro
    const response = await axios.get(`http://localhost:1337/api/appointments?filters[documentId][$eq]=${route.params.id}`)
    console.log('API appointment response:', response.data)

    if (response.data && response.data.data && response.data.data.length > 0) {
      const { doctorName, date, reason, statusC } = response.data.data[0]
      appointment.value = { doctorName, date, reason, statusC }
    } else {
      console.error('Appointment not found')
    }
  } catch (error) {
    console.error('Error fetching appointment:', error)
  }
}

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

onMounted(() => {
  fetchAppointment()
})
</script>
  