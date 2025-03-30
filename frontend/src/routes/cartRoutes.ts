import { Router } from "express";
import { body, param } from "express-validator";
import { addItemToCart, getCart, removeItemFromCart, clearCart } from "../controllers/cartController";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/productController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { handleValidationErrors } from "../middlewares/validationMiddleware"; // Custom middleware to handle validation errors

const router = Router();

// Cart routes
router.post(
  "/cart/add",
  authMiddleware,
  body('productId').isString().withMessage('Product ID should be a string'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity should be a positive integer'),
  handleValidationErrors,
  addItemToCart
);

router.get("/cart", authMiddleware, getCart);

router.delete(
  "/cart/remove/:itemId",
  authMiddleware,
  param('itemId').isString().withMessage('Item ID should be a string'),
  handleValidationErrors,
  removeItemFromCart
);

router.delete("/cart/clear", authMiddleware, clearCart);

// Product routes
router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.post("/products", authMiddleware, createProduct);
router.put("/products/:id", authMiddleware, updateProduct);
router.delete("/products/:id", authMiddleware, deleteProduct);

export default router;
