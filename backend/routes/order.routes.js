import express from 'express'
import asyncHandler from 'express-async-handler'
import {
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder
} from '../controllers/orderController.js'

import {
  validateNewOrder,
  validateOrderUpdate
} from '../utils/validators.js'

import { authMiddleware } from '../middleware/authMiddleware.js'
import { errorHandler } from '../middleware/errorHandler.js'

const router = express.Router()

/**
 * @route   POST /orders
 * @desc    Create a new order
 * @access  Protected
 */
router.post(
  '/',
  authMiddleware,
  validateNewOrder,
  asyncHandler(createOrder)
)

/**
 * @route   GET /orders/:id
 * @desc    Get order details by ID
 * @access  Protected
 */
router.get(
  '/:id',
  authMiddleware,
  asyncHandler(getOrder)
)

/**
 * @route   PUT /orders/:id
 * @desc    Update an existing order
 * @access  Protected
 */
router.put(
  '/:id',
  authMiddleware,
  validateOrderUpdate,
  asyncHandler(updateOrder)
)

/**
 * @route   DELETE /orders/:id
 * @desc    Delete an order by ID
 * @access  Protected
 */
router.delete(
  '/:id',
  authMiddleware,
  asyncHandler(deleteOrder)
)

// Centralized error handler
router.use(errorHandler)

export default router
