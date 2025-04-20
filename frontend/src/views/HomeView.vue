<!DOCTYPE html>
<html lang="en">
  <script src="https://sdk.minepi.com/pi-sdk.js"></script>
<script>Pi.init({ version: "2.0" })</script>
<head>
  script src="https://sdk.minepi.com/pi-sdk.js"></script>
<script>
  Pi.init({ version: "2.0", sandbox: true });
</script>

  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Palace of Goodz</title>
  <meta name="description" content="A Pi-powered marketplace for artisan goods" />
  <link rel="icon" href="/logo.png" type="image/png" />
  <style>
    body {
      margin: 0;
      font-family: 'Segoe UI', sans-serif;
      background: #f9fafb;
      color: #111;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      text-align: center;
      padding: 1rem;
    }
    h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    p {
      margin-bottom: 2rem;
      color: #555;
    }
    .button {
      background: #facc15;
      color: #111;
      padding: 0.75rem 1.5rem;
      font-weight: bold;
      border: none;
      border-radius: 0.5rem;
      text-decoration: none;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .footer-links {
      margin-top: 2rem;
      font-size: 0.875rem;
    }
    .footer-links a {
      color: #555;
      text-decoration: underline;
      margin: 0 0.5rem;
    }
  </style>
</head>
<body>
  <img src="/logo.png" alt="Palace of Goodz Logo" style="width: 80px; height: 80px; margin-bottom: 1rem;" />
  <h1>Welcome to Palace of Goodz</h1>
  <p>A decentralized marketplace built for Pioneers.</p>
  <a href="/" class="button">Enter Marketplace</a>  <div class="footer-links">
    <a href="#" onclick="window.__PrivacyPolicyModal__.value = true">Privacy Policy</a>
    |
    <a href="#" onclick="window.__TermsOfServiceModal__.value = true">Terms of Service</a>
  </div>
</body>
</html>
<template>
  <div>
    <button
      @click="initiatePayment"
      :disabled="isLoading"
    >
      <span v-if="!isLoading">Pay with Pi</span>
      <span v-else>
        <div class="spinner"></div>  <!-- CSS Spinner -->
        Processing...
      </span>
    </button>
  </div>
</template>

<style scoped>
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border-left-color: #09f;

  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
<template>
  <div class="home">
    <h1>Palace of Goodz</h1>
    <PiLogin @logged-in="onLogin" />
    <PiPayment v-if="token" :token="token" />
  </div>
</template>

<script setup>
import PiLogin from '@/components/PiLogin.vue'
import PiPayment from '@/components/PiPayment.vue'
import { ref } from 'vue'

const token = ref(null)
const onLogin = (t) => { token.value = t }
</script>
