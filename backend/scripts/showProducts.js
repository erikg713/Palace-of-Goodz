import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Product from '../models/Product.js'

dotenv.config()
mongoose.connect(process.env.MONGO_URI)

async function showAll() {
  const products = await Product.find()
  console.log('Current Products:')
  products.forEach(p => {
    console.log(`${p.name} - ${p.price}π`)
  })
  process.exit()
}

showAll()
