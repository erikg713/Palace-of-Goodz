import { Router } from "express";
import { addItemToCart, getCart, removeItemFromCart, clearCart } from "../controllers/cartController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { body, param } from "express-validator";
import { handleValidationErrors } from "../middlewares/validationMiddleware"; // Custom middleware to handle validation errors

const router = Router();

// Add item to cart
router.post(
  "/add",
  authMiddleware,
  body('productId').isString().withMessage('Product ID should be a string'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity should be a positive integer'),
  handleValidationErrors,
  addItemToCart
);

// Get cart
router.get("/", authMiddleware, getCart);

// Remove item from cart
router.delete(
  "/remove/:itemId",
  authMiddleware,
  param('itemId').isString().withMessage('Item ID should be a string'),
  handleValidationErrors,
  removeItemFromCart
);

// Clear cart
router.delete("/clear", authMiddleware, clearCart);

export default router;
