import express from "express";
import cors from "cors";
import { env } from "./config/dotenv"; // Loads environment variables
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import orderRoutes from "./routes/orderRoutes";
import paymentRoutes from "./routes/paymentRoutes";
import { errorHandler } from "./utils/errorHandler";

const app = express();

// ✅ Middleware
app.use(cors({ origin: env.CLIENT_URL || "*" })); // Allow frontend URL
app.use(express.json());

// ✅ API Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);

// ✅ Global Error Handler
app.use(errorHandler);

export default app;

import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

app.config.globalProperties.$pi = {
  init: () => {
    return new Promise((resolve) => {
      window.addEventListener('sdkReady', () => {
        Pi.init({ version: "2.0", sandbox: true });
        resolve();
      });
    });
  }
};

app.mount('#app');


<template>
  <router-view />
</template>
methods: {
  async piLogin() {
    const scopes = ['payments'];

    function onIncompletePaymentFound(payment) {
      console.log('Found unfinished payment:', payment);
    }

    try {
      const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);

      const res = await fetch('/api/auth/pi-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(auth),
      });

      const data = await res.json();
      console.log('User verified:', data);

      // You could store the user info locally here:
      localStorage.setItem('pi_user', JSON.stringify(data.user));
    } catch (err) {
      console.error('Pi login failed:', err);
    }
  }
}
