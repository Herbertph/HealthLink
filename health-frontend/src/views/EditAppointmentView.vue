<template>
  <div class="p-6 max-w-md mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-blue-700">Edit Appointment</h1>

    <form v-if="appointment" @submit.prevent="updateAppointment" class="space-y-6">
      <div>
        <label class="block mb-2 font-semibold">Doctor Name</label>
        <input v-model="appointment.doctorName" type="text" class="w-full p-2 border rounded-md" required />
      </div>

      <div>
        <label class="block mb-2 font-semibold">Date</label>
        <input v-model="appointment.date" type="datetime-local" class="w-full p-2 border rounded-md" required />
      </div>

      <div>
        <label class="block mb-2 font-semibold">Reason</label>
        <input v-model="appointment.reason" type="text" class="w-full p-2 border rounded-md" />
      </div>

      <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
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
const appointment = ref(null)

const fetchAppointment = async () => {
  try {
    const token = localStorage.getItem('jwt')
    if (!token) return

    const response = await axios.get(`http://localhost:1337/api/appointments?populate=*&filters[documentIdd][$eq]=${route.params.documentIdd}&publicationState=preview`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

if (response.data.data.length > 0) {
      const fetched = response.data.data[0]
      appointment.value = {
        id: fetched.id,
        doctorName: fetched.doctorName, 
        date: formatDateForInput(fetched.date), 
        reason: fetched.reason 
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
    const token = localStorage.getItem('jwt');
    if (!token || !appointment.value) return;

    await axios.put(`http://localhost:1337/api/appointments/${appointment.value.id}`, {
      data: {
        doctorName: appointment.value.doctorName,
        date: new Date(appointment.value.date).toISOString(), 
        reason: appointment.value.reason,
      },
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Appointment updated successfully!');
    router.push('/');
  } catch (error) {
    console.error('Error updating appointment:', error);
  }
};

const formatDateForInput = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const iso = date.toISOString()
  return iso.slice(0, 16) // yyyy-MM-ddTHH:mm
}

onMounted(() => {
  fetchAppointment()
})
</script>
