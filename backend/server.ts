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

dotenv.config(); // Load environment variables

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

// Define PORT (avoid re-declaring `PORT`)
const PORT = process.env.PORT || 5000;

// Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Ensure to handle async/await properly
const query = 'SELECT * FROM payments;';
pool.query(query).then(result => {
  console.log(result);
}).catch(err => {
  console.error('Error executing query', err.stack);
});
