<template>
    <div class="p-6">
      <h1 class="text-3xl font-bold mb-6 text-blue-700">Schedule a New Appointment</h1>
  
      <form @submit.prevent="createAppointment" class="space-y-6">
        <div>
          <label class="block mb-2 font-semibold">Doctor's Name</label>
          <input
            v-model="doctorName"
            type="text"
            class="w-full p-2 border rounded-md"
            required
          />
        </div>
  
        <div>
          <label class="block mb-2 font-semibold">Date and Time</label>
          <input
            v-model="date"
            type="datetime-local"
            class="w-full p-2 border rounded-md"
            required
          />
        </div>
  
        <div>
          <label class="block mb-2 font-semibold">Reason</label>
          <textarea
            v-model="reason"
            class="w-full p-2 border rounded-md"
            rows="4"
            placeholder="Optional"
          ></textarea>
        </div>
  
        <button
          type="submit"
          class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Create Appointment
        </button>
      </form>
  
      <div v-if="successMessage" class="mt-6 text-green-600 font-semibold">
        {{ successMessage }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  
  const doctorName = ref('')
  const date = ref('')
  const reason = ref('')
  const successMessage = ref('')
  const router = useRouter()
  
  const createAppointment = async () => {
  try {
    const token = localStorage.getItem('jwt'); 

    await axios.post('http://localhost:1337/api/appointments', {
      data: {
        doctorName: doctorName.value,
        date: date.value,
        reason: reason.value,
      }
    }, {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    });

    successMessage.value = 'Appointment created successfully! Redirecting...'

    setTimeout(() => {
      router.push('/')
    }, 1500)
  } catch (error) {
    console.error('Error creating appointment:', error)
    errorMessage.value = 'Failed to create appointment.'
  }
}

  </script>
  