// scripts/resetProducts.js
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Product from '../models/Product.js'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
  console.error('❌ MONGO_URI not defined in .env file')
  process.exit(1)
}

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('✅ Connected to MongoDB')
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message)
    process.exit(1)
  }
}

async function resetDB() {
  try {
    await Product.deleteMany()
    console.log('🗑️ All products deleted.')
  } catch (err) {
    console.error('❌ Error deleting products:', err.message)
  } finally {
    mongoose.connection.close(() => {
      console.log('🔌 MongoDB connection closed.')
      process.exit()
    })
  }
}

async function run() {
  await connectDB()
  await resetDB()
}

run()
