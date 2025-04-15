// seed/products.js
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Product from '../models/Product.js'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
  console.error('❌ MONGO_URI not found in .env')
  process.exit(1)
}

const sampleProducts = [
  {
    name: 'Pi T-Shirt',
    description: 'Cool black tee with Pi symbol',
    price: 3.14,
    imageUrl: 'https://example.com/tshirt.jpg',
    category: 'clothing',
    inStock: true,
    tags: ['math', 'nerdy', 'fashion']
  },
  {
    name: 'Pi Mug',
    description: 'Ceramic mug for Pioneers',
    price: 1.59,
    imageUrl: 'https://example.com/mug.jpg',
    category: 'accessories',
    inStock: true,
    tags: ['math', 'coffee', 'gift']
  }
]

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('✅ Connected to MongoDB')
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message)
    process.exit(1)
  }
}

async function seedProducts() {
  try {
    await Product.deleteMany()
    await Product.insertMany(sampleProducts)
    console.log('🌱 Product seeding complete')
  } catch (err) {
    console.error('❌ Seeding error:', err.message)
  } finally {
    mongoose.connection.close(() => {
      console.log('🔌 MongoDB connection closed')
      process.exit(0)
    })
  }
}

async function runSeeder() {
  await connectDB()
  await seedProducts()
}

runSeeder()
