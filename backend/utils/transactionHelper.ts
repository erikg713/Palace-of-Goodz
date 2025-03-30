import PiPaymentService from '../services/piPaymentService';
import Product from '../models/Product';
import Order from '../models/Order';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import logger from '../utils/logger'; // Assuming a custom logger is set up

// Transaction Processing Function
export const processPiTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Step 1: Fetch Product Details
    const product = await Product.findById(req.body.productId).session(session);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Step 2: Deduct Product Quantity
    if (product.quantity <= 0) {
      return res.status(400).json({ error: 'Product is out of stock' });
    }
    product.quantity -= 1;
    await product.save({ session });

    // Obtain buyer info from decoded JWT (if authMiddleware is used)
    const buyer = req.user; // assume this is set in authMiddleware

    // Step 3: Create Order
    const order = new Order({
      paymentId: req.body.paymentId,
      productId: product._id,
      buyer: buyer._id, // assuming you'll store the buyer ID in the order
    });
    await order.save({ session });

    // Commit transaction
    await session.commitTransaction();

    // Send response
    res.status(201).json({ message: 'Order processed successfully', order });

  } catch (error) {
    // Abort transaction on error
    await session.abortTransaction();
    logger.error('Transaction failed', { error }); // Log the error for debugging
    res.status(500).json({ error: 'Transaction failed. Please try again.' });
  } finally {
    session.endSession(); // Ensure the session is ended
  }
};

// Auth Middleware
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // Extract the JWT token
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded; // Assuming the decoded token contains user info
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};
