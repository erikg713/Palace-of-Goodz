import { Router } from "express";
import { loginUser, registerUser, getUserProfile } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateLogin, validateRegister } from "../middlewares/validationMiddleware"; // Assuming you have validation middleware

const router = Router();

/**
 * @route POST /login
 * @desc Login user
 * @access Public
 */
router.post("/login", validateLogin, loginUser);

/**
 * @route POST /register
 * @desc Register new user
 * @access Public
 */
router.post("/register", validateRegister, registerUser);

/**
 * @route GET /profile
 * @desc Get user profile
 * @access Private
 */
router.get("/profile", authMiddleware, getUserProfile);

export default router;
