// Project: Palace of Goodz // Directory: backend/routes/products.js

import express from 'express'; import Product from '../models/Product.js';

const router = express.Router(); const ADMIN_UIDS = ['your-admin-pi-uid']; // Replace with real UID

router.get('/', async (req, res) => { try { const products = await Product.find().sort({ createdAt: -1 }); res.json({ products }); } catch (err) { console.error('Error fetching products:', err); res.status(500).json({ error: 'Failed to fetch products' }); } });

router.post('/', async (req, res) => { const { admin, name, description, price, image } = req.body; if (!ADMIN_UIDS.includes(admin)) { return res.status(403).json({ error: 'Access denied' }); }

try { const newProduct = new Product({ name, description, price, image }); await newProduct.save(); res.json({ success: true, product: newProduct }); } catch (err) { console.error('Error creating product:', err); res.status(500).json({ error: 'Failed to create product' }); } });

router.delete('/:id', async (req, res) => { const { admin } = req.body; const { id } = req.params; if (!ADMIN_UIDS.includes(admin)) { return res.status(403).json({ error: 'Access denied' }); }

try { await Product.findByIdAndDelete(id); res.json({ success: true }); } catch (err) { console.error('Error deleting product:', err); res.status(500).json({ error: 'Failed to delete product' }); } });

export default router;



import express from 'express';
import { createProduct, getProduct, updateProduct, deleteProduct, getAllProducts } from '../controllers/productController';
import { validateProduct } from '../utils/validator';

const router = express.Router();

// Route to create a new product
router.post('/', validateProduct, createProduct);

// Route to get a product by ID
router.get('/:id', getProduct);

// Route to update a product by ID
router.put('/:id', validateProduct, updateProduct);

// Route to delete a product by ID
router.delete('/:id', deleteProduct);

// Route to get all products
router.get('/', getAllProducts);

export default router;
