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
