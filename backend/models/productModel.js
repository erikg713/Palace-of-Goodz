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
const mongoose = require('mongoose');

// 1. Define the schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  // ... any other fields
});

// 2. Create the model from the schema
const Product = mongoose.model('Product', productSchema);

// 3. Export the model
module.exports = Product;
