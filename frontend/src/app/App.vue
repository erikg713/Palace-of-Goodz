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
