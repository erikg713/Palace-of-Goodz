import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import paymentRoutes from './routes/paymentRoutes.js';
import productRoutes from './routes/productRoutes.js';
import mongoose from 'mongoose';
import { createApp } from 'vue'

const app = createApp({
  /* root component options */
})
dotenv.config(); // Load environment variables

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const paymentRoutes = require('./routes/payment');
app.use('/api/payment', paymentRoutes);
app.use('/products', productRoutes);
app.use('/payment', paymentRoutes);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
