import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Validate required environment variables
const mongoUri = process.env.MONGO_URI;
const dbConnectionString = process.env.DB_CONNECTION_STRING;

if (!mongoUri) {
  throw new Error('Missing required environment variable: MONGO_URI');
}

if (!dbConnectionString) {
  throw new Error('Missing required environment variable: DB_CONNECTION_STRING');
}

// MongoDB Connection
const connectMongoDB = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process with failure
  }
};

// PostgreSQL Connection
import { Pool } from 'pg';

// Create a new pool instance
const pool = new Pool({
  connectionString: dbConnectionString,
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
  process.exit(-1);
});

// Export both connection functions for use
export { connectMongoDB, pool };
