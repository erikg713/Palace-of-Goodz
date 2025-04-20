import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

export default connectDB;

import 'reflect-metadata';
import { DataSource, DataSourceOptions, EntityManager } from 'typeorm';
import mongoose from "mongoose";
import { Pool } from "pg";
import { env } from "../config/dotenv";
import logger from "../utils/logger";

// Choose between MongoDB or PostgreSQL
const USE_MONGODB = env.MONGODB_URI !== undefined;
const USE_POSTGRES = env.DATABASE_URL !== undefined;

// ✅ MongoDB Connection
const connectMongoDB = async (): Promise<void> => {
  if (!USE_MONGODB) return;

  try {
    await mongoose.connect(env.MONGODB_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Fast fail on bad connection
    } as mongoose.ConnectOptions);
    
    logger.info("✅ Connected to MongoDB Database");
  } catch (error) {
    logger.error("❌ MongoDB Connection Failed. Retrying in 5s...", error);
    setTimeout(connectMongoDB, 5000);
  }
};
