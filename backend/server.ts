import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import pool from '../config/db.js';

// Import Routes
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";
import userRoutes from "./routes/userRoutes";
import cartRoutes from "./routes/cartRoutes";
import authRoutes from "./routes/authRoutes";
import paymentRoutes from "./routes/paymentRoutes";

// Import Middlewares
import { authMiddleware } from "./middlewares/authMiddleware";
import { errorMiddleware } from "./middlewares/errorMiddleware";

// Load environment variables
dotenv.config();

const app = express();

// Connect to Database
connectDB();

// Middleware Setup
app.use(cors());
app.use(express.json());

// Routes Setup
app.use("/api/auth", authRoutes);
app.use("/api/products", authMiddleware, productRoutes);
app.use("/api/orders", authMiddleware, orderRoutes);
app.use("/api/users", authMiddleware, userRoutes);
app.use("/api/cart", authMiddleware, cartRoutes);
app.use("/api/payments", paymentRoutes); // Payment routes

// Error Handling Middleware
app.use(errorMiddleware);

// Define PORT
const PORT = process.env.PORT || 5000;

// Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Ensure to handle async/await properly
import { Pool } from 'pg'; // Assuming pg is the PostgreSQL client library being used

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use environment variables for configuration
});

const executeQuery = async () => {
  const query = 'SELECT * FROM payments;';
  try {
    const result = await pool.query(query);
    console.log(result.rows);
  } catch (err) {
    // Use a logging library for better error management
    console.error('Error executing query', err);
    // Optionally, you can rethrow or handle the error depending on the context
  }
};

executeQuery();
