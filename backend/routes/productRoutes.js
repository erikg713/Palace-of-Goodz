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
