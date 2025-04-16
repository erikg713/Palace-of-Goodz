import Product from '../models/Product.js';

// Admin check helper
const isAdmin = (user) => user?.roles?.includes('admin');

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    return res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const createProduct = async (req, res) => {
  if (!isAdmin(req.user)) {
    return res.status(403).json({ error: "Not authorized" });
  }
  
  try {
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  } catch (err) {
    console.error("Error creating product:", err);
    return res.status(500).json({ error: "Failed to create product" });
  }
};

export const deleteProduct = async (req, res) => {
  if (!isAdmin(req.user)) {
    return res.status(403).json({ error: "Not authorized" });
  }

  try {
    await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    return res.status(500).json({ error: "Failed to delete product" });
  }
};
