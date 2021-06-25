import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Welcome from '../components/Welcome.vue'

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
    redirect:  '/welcome',
    children: [
      {
        name: 'welcome',
        path: '/welcome',
        component: Welcome
      },
      {
        name: 'login',
        path: '/login',
        component: Login
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
