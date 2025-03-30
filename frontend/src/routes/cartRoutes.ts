import { Router } from "express";
import { body, param } from "express-validator";

// Controllers
import {
  addItemToCart,
  getCart,
  removeItemFromCart,
  clearCart,
} from "../controllers/cartController";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";

// Middlewares
import { authMiddleware } from "../middlewares/authMiddleware";
import { handleValidationErrors } from "../middlewares/validationMiddleware"; // Custom middleware to handle validation errors

const router = Router();

// Cart routes

/**
 * Route to add an item to the cart
 * Requires authentication
 * Validates productId and quantity fields
 */
router.post(
  "/cart/add",
  authMiddleware,
  body("productId").isString().withMessage("Product ID should be a string"),
  body("quantity").isInt({ min: 1 }).withMessage("Quantity should be a positive integer"),
  handleValidationErrors,
  addItemToCart
);

/**
 * Route to get the current user's cart
 * Requires authentication
 */
router.get("/cart", authMiddleware, getCart);

/**
 * Route to remove an item from the cart
 * Requires authentication
 * Validates itemId parameter
 */
router.delete(
  "/cart/remove/:itemId",
  authMiddleware,
  param("itemId").isString().withMessage("Item ID should be a string"),
  handleValidationErrors,
  removeItemFromCart
);

/**
 * Route to clear the cart
 * Requires authentication
 */
router.delete("/cart/clear", authMiddleware, clearCart);

// Product routes

/**
 * Route to get all products
 */
router.get("/products", getProducts);

/**
 * Route to get a product by ID
 * Requires product ID in the URL parameter
 */
router.get("/products/:id", getProductById);

/**
 * Route to create a new product
 * Requires authentication
 */
router.post("/products", authMiddleware, createProduct);

/**
 * Route to update a product by ID
 * Requires authentication
 * Requires product ID in the URL parameter
 */
router.put("/products/:id", authMiddleware, updateProduct);

/**
 * Route to delete a product by ID
 * Requires authentication
 * Requires product ID in the URL parameter
 */
router.delete("/products/:id", authMiddleware, deleteProduct);

export default router;
