import PiLogin from '@/views/PiLogin.vue'
import Dashboard from '@/views/Dashboard.vue'

const routes = [
  { path: '/', component: PiLogin },
  { path: '/dashboard', component: Dashboard }, // Requires auth
]

import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
const express = require('express');
const router = express.Router();
const verifyPiToken = require('../middlewares/piAuth');

router.get('/profile', verifyPiToken, async (req, res) => {
  const user = req.piUser;
  res.json({ message: `Welcome, ${user.username}` });
});
const routes = [
  { path: '/', name: 'Home', component: Home },
]

export default createRouter({
  history: createWebHistory(),
  routes
})
{
  path: '/admin',
  component: () => import('@/views/Admin.vue')
}
