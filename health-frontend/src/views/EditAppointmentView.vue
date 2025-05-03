<template>
  <div class="p-6 max-w-md mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-blue-700">Edit Appointment</h1>

    <form v-if="formData" @submit.prevent="updateAppointment" class="space-y-6">
      <div>
        <label class="block mb-2 font-semibold">Doctor Name</label>
        <input v-model="formData.doctorName" type="text" class="w-full p-2 border rounded-md" required />
      </div>

      <div>
        <label class="block mb-2 font-semibold">Date</label>
        <input v-model="formData.date" type="datetime-local" class="w-full p-2 border rounded-md" required />
      </div>

      <div>
        <label class="block mb-2 font-semibold">Reason</label>
        <input v-model="formData.reason" type="text" class="w-full p-2 border rounded-md" />
      </div>

      <button 
        type="submit" 
        class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Save Changes
      </button>
    </form>

    <div v-else class="text-gray-600">
      Loading appointment details...
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const formData = ref(null)

const fetchAppointment = async () => {
  try {
    const token = localStorage.getItem('jwt')
    if (!token) return

    const documentId = route.params.id

    const response = await axios.get(`http://localhost:1337/api/appointments?filters[documentId][$eq]=${documentId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const fetched = response.data.data[0]

    if (fetched) {
      formData.value = {
        id: fetched.id,
        doctorName: fetched.attributes.doctorName,
        date: formatDateForInput(fetched.attributes.date),
        reason: fetched.attributes.reason || ''
      }
    } else {
      console.error('Appointment not found')
    }
  } catch (error) {
    console.error('Error fetching appointment:', error)
  }
}

const updateAppointment = async () => {
  try {
    const token = localStorage.getItem('jwt')
    if (!token || !formData.value) return

    await axios.put(`http://localhost:1337/api/appointments/${formData.value.id}`, {
      data: {
        doctorName: formData.value.doctorName,
        date: new Date(formData.value.date).toISOString(),
        reason: formData.value.reason
      }
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    console.log('Appointment updated successfully!')
    router.push('/')
    setTimeout(() => window.location.reload(), 300)
  } catch (error) {
    console.error('Error updating appointment:', error)
  }
}

const formatDateForInput = (dateString) => {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  const timezoneOffset = date.getTimezoneOffset() * 60000
  const localISOTime = new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 16)

  return localISOTime
}

onMounted(() => {
  fetchAppointment()
})
</script>
