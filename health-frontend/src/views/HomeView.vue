<template>
  <div class="p-6">
    <div v-if="appointments.length === 0" class="flex flex-col items-center justify-center mt-12">
      <img src="@/assets/main.png" alt="No appointments" class="w-80 mb-6" />
      <p class="text-gray-600 text-xl">No appointments scheduled yet.</p>
    </div>

    <div v-else>
      <h1 class="text-3xl font-bold mb-6 text-blue-700">Appointments List</h1>

      <div 
        v-for="appointment in appointments" 
        :key="appointment.id" 
        class="bg-white p-6 rounded-lg shadow-md mb-4"
      >
        <h2 class="text-xl font-semibold mb-2">{{ appointment.doctorName }}</h2>
        <p><strong>Date:</strong> {{ formatDate(appointment.date) }}</p>
        <p><strong>Reason:</strong> {{ appointment.reason || 'Not provided' }}</p>

        <div class="flex gap-4 mt-4">
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const appointments = ref([])

const fetchAppointments = async () => {
  try {
    const token = localStorage.getItem('jwt');
    if (!token) {
      appointments.value = [];
      return;
    }

    const response = await axios.get('http://localhost:1337/api/appointments', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('API Response:', response.data);

    appointments.value = response.data.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    appointments.value = [];
  }
}

const deleteAppointment = async (id) => {
  try {
    const token = localStorage.getItem('jwt');
    if (!token) return;

    await axios.delete(`http://localhost:1337/api/appointments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setTimeout(() => {
      window.location.reload();
    }, 300);
  } catch (error) {
    console.error('Error deleting appointment:', error);
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'Unknown date';
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

onMounted(() => {
  fetchAppointments();
})
</script>
