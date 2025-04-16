import Product from '../models/Product.js'

// Admin check helper
const isAdmin = (user) => user.roles?.includes('admin')

export const getAllProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 })
  res.json(products)
}

export const createProduct = async (req, res) => {
  if (!isAdmin(req.user)) return res.status(403).json({ error: 'Not authorized' })
  const product = await Product.create(req.body)
  res.json(product)
}

export const deleteProduct = async (req, res) => {
  if (!isAdmin(req.user)) return res.status(403).json({ error: 'Not authorized' })
  await Product.findByIdAndDelete(req.params.id)
  res.json({ success: true })
}
import Product from '../models/Product.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    return res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    return res.status(201).json(savedProduct);
  } catch (err) {
    console.error("Error creating product:", err);
    return res.status(500).json({ error: "Failed to create product" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    console.error("Error deleting product:", err);
    return res.status(500).json({ error: "Failed to delete product" });
  }
};
