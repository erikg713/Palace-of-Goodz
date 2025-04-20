import express from "express";
import cors from "cors";
import { env } from "./config/dotenv"; // Loads environment variables
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import orderRoutes from "./routes/orderRoutes";
import paymentRoutes from "./routes/paymentRoutes";
import { errorHandler } from "./utils/errorHandler";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import PrivateAdminRoute from "./components/PrivateAdminRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateAdminRoute from "./routes/PrivateAdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route
          path="/admin"
          element={
            <PrivateAdminRoute>
              <AdminDashboard />
            </PrivateAdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import AdminOrders from "./pages/AdminOrders";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AdminDashboard from "./pages/AdminDashboard";
import PiAuth from "./components/PiAuth";
import PiPayment from "./components/PiPayment";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected User Routes */}
          <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />

          {/* Protected Admin Routes */}
          <Route path="/admin/orders" element={<PrivateAdminRoute><AdminOrders /></PrivateAdminRoute>} />
          <Route path="/admin" element={<PrivateAdminRoute><AdminDashboard /></PrivateAdminRoute>} />

          {/* Pi Network DApp Inside Dashboard */}
          <Route path="/dashboard/pi" element={
            <PrivateRoute>
              <div>
                <h1>Pi Network DApp</h1>
                <PiAuth />
                <PiPayment />
              </div>
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
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
