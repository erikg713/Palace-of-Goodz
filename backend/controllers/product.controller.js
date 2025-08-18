import Product from "../models/Product.js";

export const listProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const createProduct = async (req, res) => {
  try {
    const { name, price_in_pi, description, image_url } = req.body;
    const product = await Product.create({ name, price_in_pi, description, image_url });
    res.json({ success: true, product });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
