import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
  category: String, // <-- New
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Product', productSchema)
