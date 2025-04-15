import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Product from '../models/Product.js'

dotenv.config()
mongoose.connect(process.env.MONGO_URI)

async function resetDB() {
  await Product.deleteMany()
  console.log('All products deleted.')
  process.exit()
}

resetDB()
