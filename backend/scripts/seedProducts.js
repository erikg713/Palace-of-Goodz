import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Product from '../models/Product.js'

dotenv.config()
mongoose.connect(process.env.MONGO_URI)

const sampleProducts = [
  {
    name: 'Pi T-Shirt',
    description: 'Cool black tee with Pi symbol',
    price: 3.14,
    imageUrl: 'https://example.com/tshirt.jpg'
  },
  {
    name: 'Pi Mug',
    description: 'Ceramic mug for Pioneers',
    price: 1.59,
    imageUrl: 'https://example.com/mug.jpg'
  }
]

async function seed() {
  await Product.deleteMany()
  await Product.insertMany(sampleProducts)
  console.log('Seed complete')
  process.exit()
}

seed()
const sampleProducts = [
  {
    name: 'Pi T-Shirt',
    description: 'Cool black tee with Pi symbol',
    price: 3.14,
    imageUrl: 'https://example.com/tshirt.jpg',
    category: 'clothing'
  },
  {
    name: 'Pi Mug',
    description: 'Ceramic mug for Pioneers',
    price: 1.59,
    imageUrl: 'https://example.com/mug.jpg',
    category: 'accessories'
  }
]
