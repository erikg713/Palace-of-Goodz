import express from 'express';

// Middleware
import { protect } from "../middleware/auth.middleware.js";

// Controllers
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  changePassword,
  getMyOrders,
  // Forgot & Reset Password
  forgotPassword,
  resetPassword,
} from "../controllers/user.controller.js";

const router = express.Router();

/* ====================== PUBLIC ROUTES ====================== */

/**
 * @desc    Register a new user
 * @route   POST /api/users/register
 * @access  Public
 */
router.post("/register", registerUser);

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/users/login
 * @access  Public
 */
router.post("/login", loginUser);

/**
 * @desc    Forgot Password - Send reset email
 * @route   POST /api/users/forgot-password
 * @access  Public
 */
router.post("/forgot-password", forgotPassword);

/**
 * @desc    Reset Password using token
 * @route   POST /api/users/reset-password
 * @access  Public
 */
router.post("/reset-password", resetPassword);

/* ====================== PROTECTED ROUTES ====================== */

/**
 * @desc    Get user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
router.get("/profile", protect, getUserProfile);

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
router.put("/profile", protect, updateUserProfile);

/**
 * @desc    Change password (while logged in)
 * @route   PUT /api/users/change-password
 * @access  Private
 */
router.put("/change-password", protect, changePassword);

/**
 * @desc    Get logged-in user's orders
 * @route   GET /api/users/orders
 * @access  Private
 */
router.get("/orders", protect, getMyOrders);

export default router;
