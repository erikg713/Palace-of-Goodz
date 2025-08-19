import express from 'express';
import { recordNewPayment, verifyPayment } from '../controllers/paymentController.js';
import { piAuthMiddleware } from '../middleware/piAuthMiddleware.js';
import { Router } from "express";
import { startPayment, confirmPayment } from "../controllers/payment.controller.js";

const router = Router();
router.post("/create", startPayment);
router.post("/verify", confirmPayment);

export default router;
const router = express.Router();

// Routes for processing and verifying payments
router.post('/record', piAuthMiddleware, recordNewPayment);
router.post('/verify', piAuthMiddleware, verifyPayment);

export default router;
