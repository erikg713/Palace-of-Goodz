import express from 'express';
import Order from '../models/Order.js';
import express from "express";

// Middleware
import { protect } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/role.middleware.js";

// Controllers (adjust paths to your structure)
import {
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
  getDashboardStats
} from "../controllers/admin.controller.js";

const router = express.Router();

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
 * @desc    Update user role (e.g., user → admin)
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

export default router;
const router = express.Router();
const ADMIN_UIDS = ['your-admin-pi-uid']; // Replace with real UID

router.get('/orders', async (req, res) => {
  const { admin } = req.query;
  if (!ADMIN_UIDS.includes(admin)) {
    return res.status(403).json({ error: 'Access denied' });
  }
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    console.error('Error retrieving orders:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

export default router;
