import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import CreateUser from '../views/CreateUser.vue'
import UserList from '../views/UserList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/create-user',
      name: 'createUser',
      component: CreateUser
    },
    {
      path: '/user-list',
      name: 'userList',
      component: UserList
    },
  ]
})

export default router
