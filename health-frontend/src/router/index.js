import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NewAppointment from '../views/NewAppointment.vue'
import AppointmentDetails from '../views/AppointmentDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/new',
      name: 'new',
      component: NewAppointment
    },
    {
      path: '/appointment/:id',
      name: 'appointment-details',
      component: AppointmentDetails
    }
  ]
})

export default router
