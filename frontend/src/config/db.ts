import { Pool } from "pg";
import dotenv from "dotenv";
import winston from "winston";

// Load environment variables from .env file
dotenv.config();

// Ensure the POSTGRES_URI environment variable is set
if (!process.env.POSTGRES_URI) {
  throw new Error("POSTGRES_URI environment variable is not set.");
}

// Create a new PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.POSTGRES_URI,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
});

// Configure winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    // Add more transports here if needed (e.g., file, remote logging service)
  ],
});

// Function to connect to the PostgreSQL database
const connectDB = async () => {
  try {
    const client = await pool.connect();
    logger.info("✅ PostgreSQL Connected");
    client.release();
  } catch (error) {
    logger.error("❌ PostgreSQL Connection Error", { message: error.message, stack: error.stack });
    process.exit(1);
  }
};

export default connectDB;
