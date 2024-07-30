import { createRouter, createWebHistory } from '@ionic/vue-router';
import LoginViewPage from '../views/LoginViewPage.vue'
import HomePage from '../views/HomePage.vue'
import ServiceTasksPage from '../views/ServiceTasksPage.vue'
import ServiceTaskFormPage from '../views/ServiceTaskFormPage.vue'
import CreateServiceFormPage from '../views/CreateServiceFormPage.vue'
import MechanicalFailuresPage from '../views/MechanicalFailuresPage.vue'
import MechanicalFailuresFormPage from '../views/MechanicalFailuresFormPage.vue'
import ViewTasksPage from '../views/ViewTasksPage.vue'
import ViewTaskDetailsPage from '../views/ViewTaskDetailsPage.vue'
import ViewTaskFailuresPage from '../views/TasksFailurepage.vue'
import AutomatedTasksPage from '../views/AutomatedTasksPage.vue'
import MonitoringPage from '../views/MonitoringPage.vue'
import UsersPage from '../views/UsersPage.vue'
import LocPage from '../views/LocalitationPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginViewPage
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
    path: '/createService',
    name: 'CreateService',
    component: CreateServiceFormPage
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
    path: '/viewTasks',
    name: 'ViewTasks',
    component: ViewTasksPage
  },
  {
    path: '/viewTasksfailures',
    name: 'ViewTasksfailures',
    component: ViewTaskFailuresPage
  },
  {
    path: '/viewTasksDetails',
    name: 'ViewTaskDetails',
    component: ViewTaskDetailsPage
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
  {
    path: '/loc',
    name: 'Loc',
    component: LocPage
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
