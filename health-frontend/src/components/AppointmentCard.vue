<template>
  <motion-div
    class="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition"
    v-motion="{
      initial: { opacity: 0, y: 20 },
      enter: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300 } }
    }"
  >
    <div class="flex justify-between items-start mb-4">
      <div>
        <h2 class="text-xl font-semibold text-gray-800">{{ appointment.doctorName }}</h2>
        <p class="text-sm text-blue-600">{{ appointment.specialty || 'Doctor' }}</p>
      </div>
      <span
        class="text-xs font-semibold px-3 py-1 rounded-full"
        :class="{
          'bg-blue-100 text-blue-700': appointment.status === 'Upcoming',
          'bg-green-100 text-green-700': appointment.status === 'Confirmed',
          'bg-gray-100 text-gray-700': !appointment.status
        }"
      >
        {{ appointment.status || 'Pending' }}
      </span>
    </div>

    <div class="text-gray-600 text-sm space-y-1 mb-4">
      <p><i class="fa-regular fa-calendar mr-2"></i>{{ formatDate(appointment.date).split(',')[0] }}</p>
      <p><i class="fa-regular fa-clock mr-2"></i>{{ formatDate(appointment.date).split(',')[1] }}</p>
      <p><i class="fa-regular fa-file-lines mr-2"></i>{{ appointment.reason || 'No reason provided' }}</p>
    </div>

    <div class="flex gap-4 mt-auto">
      <RouterLink
        :to="`/appointment/edit/${appointment.documentId}`"
        class="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm"
      >
        <i class="fa-regular fa-pen-to-square mr-2"></i> Edit
      </RouterLink>
      <button
        @click="$emit('delete', appointment.id)"
        class="flex items-center justify-center px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 text-sm"
      >
        <i class="fa-regular fa-trash-can mr-2"></i> Delete
      </button>
    </div>
  </motion-div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useMotion } from '@vueuse/motion'

defineProps({
  appointment: Object,
  formatDate: Function
})

defineEmits(['delete'])
</script>
