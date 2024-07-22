import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue'
import ServiceTasksPage from '../views/ServiceTasksPage.vue'
import ServiceTaskFormPage from '../views/ServiceTaskFormPage.vue'
import MechanicalFailuresPage from '../views/MechanicalFailuresPage.vue'
import MechanicalFailuresFormPage from '../views/MechanicalFailuresFormPage.vue'
import AutomatedTasksPage from '../views/AutomatedTasksPage.vue'
import MonitoringPage from '../views/MonitoringPage.vue'
import UsersPage from '../views/UsersPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/service',
    name: 'Service',
    component: ServiceTasksPage
  },
  {
    path: '/serviceForm',
    name: 'ServiceForm',
    component: ServiceTaskFormPage
  },
  {
    path: '/failures',
    name: 'Failures',
    component: MechanicalFailuresPage
  },
  {
    path: '/failuresForm',
    name: 'FailuresForm',
    component: MechanicalFailuresFormPage
  },
  {
    path: '/automated',
    name: 'Automated',
    component: AutomatedTasksPage
  },
  {
    path: '/monitoring',
    name: 'Monitoring',
    component: MonitoringPage
  },
  {
    path: '/users',
    name: 'Users',
    component: UsersPage
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
