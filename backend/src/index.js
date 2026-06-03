require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Environment variables
const PORT = process.env.PORT || 5000;
const PI_API_KEY = process.env.PI_API_KEY;
const DATABASE_URL = process.env.DATABASE_URL;

// Database connection (placeholder - implement with your DB)
// const db = require('./db');

// Routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/products', require('./routes/products'));
// app.use('/api/payments', require('./routes/payments'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', port: PORT });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Palace of Goodz API running on http://localhost:${PORT}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
});
