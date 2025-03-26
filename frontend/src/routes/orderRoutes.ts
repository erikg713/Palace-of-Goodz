import express from "express";
import mongoose from "mongoose";
import { authMiddleware } from "../middlewares/authMiddleware";
import Order from "../models/Order";
import Product from "../models/Product";
import piPayment from "../services/piPayment";
import { createOrder, getOrderById, getUserOrders, updateOrderStatus, completePiOrder } from "../controllers/orderController";

const router = express.Router();

// Standard Order Routes
router.post("/", authMiddleware, createOrder);
router.get("/:id", authMiddleware, getOrderById);
router.get("/", authMiddleware, getUserOrders);
router.put("/:id/status", authMiddleware, updateOrderStatus);

// ✅ Pi Payment Completion Route
router.post("/complete", authMiddleware, completePiOrder);

export default router;
