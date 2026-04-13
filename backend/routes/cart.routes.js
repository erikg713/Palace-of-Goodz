import express from 'express';

// Middleware
import { protect } from "../middleware/auth.middleware.js";

// Controllers
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

/* ====================== PROTECTED CART ROUTES ====================== */

/**
 * @desc    Get user's cart
 * @route   GET /api/cart
 * @access  Private
 */
router.get('/', protect, getCart);

/**
 * @desc    Add item to cart
 * @route   POST /api/cart
 * @access  Private
 */
router.post('/', protect, addToCart);

/**
 * @desc    Update cart item quantity
 * @route   PUT /api/cart/:id
 * @access  Private
 */
router.put('/:id', protect, updateCartItem);

/**
 * @desc    Remove item from cart
 * @route   DELETE /api/cart/:id
 * @access  Private
 */
router.delete('/:id', protect, removeFromCart);

/**
 * @desc    Clear entire cart
 * @route   DELETE /api/cart
 * @access  Private
 */
router.delete('/', protect, clearCart);

export default router;

const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart'); // Adjust path as needed

// Your route code here
router.get('/', async (req, res) => {
  // ...your code...
});

module.exports = router;
