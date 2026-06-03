import express from 'express';

// Middleware
import { protect } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/role.middleware.js";

// Controllers
import {
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
  getDashboardStats,
} from "../controllers/admin.controller.js";

// Optional: If you also need to handle orders with proper auth
import Order from '../models/Order.js';

const router = express.Router();

/* ====================== ADMIN DASHBOARD & USERS ====================== */

/**
 * @desc    Admin dashboard stats
 * @route   GET /api/admin/stats
 * @access  Private/Admin
 */
router.get("/stats", protect, isAdmin, getDashboardStats);

/**
 * @desc    Get all users
 * @route   GET /api/admin/users
 * @access  Private/Admin
 */
router.get("/users", protect, isAdmin, getAllUsers);

/**
 * @desc    Get single user
 * @route   GET /api/admin/users/:id
 * @access  Private/Admin
 */
router.get("/users/:id", protect, isAdmin, getUserById);

/**
 * @desc    Update user role
 * @route   PUT /api/admin/users/:id/role
 * @access  Private/Admin
 */
router.put("/users/:id/role", protect, isAdmin, updateUserRole);

/**
 * @desc    Delete user
 * @route   DELETE /api/admin/users/:id
 * @access  Private/Admin
 */
router.delete("/users/:id", protect, isAdmin, deleteUser);

/* ====================== ORDERS (Admin only) ====================== */

/**
 * @desc    Get all orders (Admin only)
 * @route   GET /api/admin/orders
 * @access  Private/Admin
 */
router.get("/orders", protect, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, orders });
  } catch (err) {
    console.error('Error retrieving orders:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch orders' });
  }
});

export default router;
