import express from 'express';

// Middleware
import { authenticate } from '../middleware/auth.js';
import { isAdmin } from '../middleware/role.middleware.js';   // Recommended for product management

// Controllers (using consistent naming)
import {
  getAllProducts,
  listProducts,        // If you want to keep both for now
  createProduct,
  deleteProduct,
} from '../controllers/product.controller.js';

const router = express.Router();

/* ====================== PUBLIC ROUTES ====================== */

/**
 * @desc    Get all products (for customers)
 * @route   GET /api/products
 * @access  Public
 */
router.get('/', getAllProducts);

/**
 * @desc    List products (alternative endpoint if needed)
 * @route   GET /api/products/list
 * @access  Public
 */
router.get('/list', listProducts);   // You can remove this if it's duplicate

/* ====================== ADMIN ONLY ROUTES ====================== */

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Private/Admin
 */
router.post('/', authenticate, isAdmin, createProduct);

/**
 * @desc    Delete a product
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
router.delete('/:id', authenticate, isAdmin, deleteProduct);

export default router;
