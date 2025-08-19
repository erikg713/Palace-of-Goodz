import express from 'express';
import { getAllProducts, createProduct, deleteProduct } from '../controllers/productController.js';
import { authenticate } from '../middleware/auth.js';
import { Router } from "express";
import { listProducts, createProduct } from "../controllers/product.controller.js";

const router = Router();
router.get("/", listProducts);
router.post("/", createProduct); // Could protect with admin middleware later

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', authenticate, createProduct);
router.delete('/:id', authenticate, deleteProduct);

export default router;
