import express from 'express';
import { recordNewPayment, verifyPayment } from '../controllers/paymentController.js';
import { piAuthMiddleware } from '../middleware/piAuthMiddleware.js';

const router = express.Router();

// Routes for processing and verifying payments
router.post('/record', piAuthMiddleware, recordNewPayment);
router.post('/verify', piAuthMiddleware, verifyPayment);

export default router;
