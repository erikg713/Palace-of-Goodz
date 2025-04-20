import express from 'express';
import { recordNewPayment, verifyPayment } from '../controllers/paymentController.js';
import { piAuthMiddleware } from '../middleware/piAuthMiddleware.js';

const router = express.Router();

router.post('/record', piAuthMiddleware, recordNewPayment);
router.post('/verify', piAuthMiddleware, verifyPayment);

export default router;
import { defineStore } from 'pinia';
import { PiAuth } from 'pi-sdk';  // Assuming Pi SDK is being used

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  }),

  actions: {
    async login() {
      this.loading = true;
      try {
        // Use Pi SDK to authenticate user
        const piUser = await PiAuth.login();
        this.user = piUser;
        this.isAuthenticated = true;
        this.loading = false;
      } catch (err) {
        this.error = err.message || 'Authentication failed';
        this.loading = false;
      }
    },import PiPaymentService from '../services/piPaymentService';
import Product from '../models/Product';
import Order from '../models/Order';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import logger from '../utils/logger';
import mongoose from 'mongoose'; // Import mongoose for session handling

// Types for request payload
interface ProcessTransactionPayload {
  productId: string;
  paymentId: string;
}

// Utility function for error responses and logging
const handleError = (res: Response, statusCode: number, message: string, error?: any): void => {
  logger.error(message, { error });
  res.status(statusCode).json({ error: message });
};

// Transaction Processing Function
export const processPiTransaction = async (
  req: Request<{}, {}, ProcessTransactionPayload>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Validate environment variables
    if (!process.env.JWT_SECRET) {
      throw new Error('Missing JWT_SECRET environment variable.');
    }

    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return handleError(res, 400, 'Invalid input', errors.array());
    }

    // Step 1: Fetch Product Details
    const product = await Product.findById(req.body.productId).session(session);
    if (!product) {
      return handleError(res, 404, 'Product not found');
    }

    // Step 2: Deduct Product Quantity
    if (product.quantity <= 0) {
      return handleError(res, 400, 'Product is out of stock');
    }
    product.quantity -= 1;
    await product.save({ session });

    // Step 3: Create Order
    const order = new Order({
      paymentId: req.body.paymentId,
      productId: product._id,
      buyer: req.user?._id, // Ensure buyer ID is retrieved from authMiddleware
    });
    await order.save({ session });

    // Commit transaction
    await session.commitTransaction();

    // Detailed success response
    res.status(201).json({
      message: 'Order processed successfully',
      order: {
        id: order._id,
        productName: product.name, // Assuming product has a name field
        quantityLeft: product.quantity,
        buyer: req.user?.email, // Assuming user has an email field
      },
    });

  } catch (error) {
    // Abort transaction on error
    await session.abortTransaction();
    handleError(res, 500, 'Transaction failed. Please try again.', error);
  } finally {
    session.endSession(); // Ensure the session is ended
  }
};

// Auth Middleware with Rate Limiting Example
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return handleError(res, 401, 'Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded; // Assuming the decoded token contains user info
    next();
  } catch (error) {
    handleError(res, 400, 'Invalid token.', error);
  }
};

    async logout() {
      this.user = null;
      this.isAuthenticated = false;
      this.error = null;
      await PiAuth.logout();  // Log the user out via Pi SDK
    },

    async checkAuthStatus() {
      this.loading = true;
      try {
        const piUser = await PiAuth.getUser();
        if (piUser) {
          this.user = piUser;
          this.isAuthenticated = true;
        } else {
          this.user = null;
          this.isAuthenticated = false;
        }
      } catch (err) {
        this.error = err.message || 'Error checking authentication status';
      } finally {
        this.loading = false;
      }
    },
  },

  getters: {
    getUser: (state) => state.user,
    getAuthStatus: (state) => state.isAuthenticated,
    getLoadingStatus: (state) => state.loading,
    getError: (state) => state.error,
  },
});
