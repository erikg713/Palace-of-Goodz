import { Pool } from "pg";
import dotenv from "dotenv";
import winston from "winston";

dotenv.config();

if (!process.env.POSTGRES_URI) {
  throw new Error("POSTGRES_URI environment variable is not set.");
}

const pool = new Pool({
  connectionString: process.env.POSTGRES_URI,
  // Add any additional configuration options here
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
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

const connectDB = async () => {
  try {
    const client = await pool.connect();
    logger.info(`✅ PostgreSQL Connected: ${client.host}`);
    client.release();
  } catch (error) {
    logger.error(`❌ PostgreSQL Connection Error: ${error.message}`, { error });
    process.exit(1);
  }
};

export default connectDB;
