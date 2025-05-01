import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NewAppointment from '../views/NewAppointment.vue'
import AppointmentDetails from '../views/AppointmentDetails.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import EditAppointmentView from '../views/EditAppointmentView.vue'

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
    },
    { path: '/register', 
      name: 'Register', 
      component: RegisterView 
    },
    { 
      path: '/login', 
      name: 'Login', 
      component: LoginView 
    },
    {
      path: '/appointment/edit/:id',
      name: 'edit-appointment',
      component: EditAppointmentView
    }
    
  ]
})

export default router
