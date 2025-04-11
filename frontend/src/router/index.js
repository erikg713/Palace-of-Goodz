// File: frontend/src/router/index.js
// File: frontend/src/router/index.js import { createRouter, createWebHistory } from 'vue-router' import HomePage from '../pages/HomePage.vue'

const routes = [ { path: '/', name: 'Home', component: HomePage } ]

const router = createRouter({ history: createWebHistory(), routes })

export default router



import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import AdminPanel from '../pages/AdminPanel.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/admin',
    name: 'AdminPanel',
    component: AdminPanel
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

