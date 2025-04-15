import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import AdminPanel from '../pages/AdminPanel.vue'
script src="https://sdk.minepi.com/pi-sdk.js"></script>
<script>
  Pi.init({ version: "2.0", sandbox: true });
</script>

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

