import express from "express";
import cors from "cors";

// Routes
import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js"; // new cart API

// Middleware
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Core middleware
app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());

// Route registrations
app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes); // mount cart routes

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);

app.use(errorHandler);

export default app;
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

// Error handler
app.use(errorHandler);

export default app;
