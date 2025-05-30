import Payment from '../models/Payment.js';
import PiPaymentService from '../services/piPaymentService';
import Order from '../models/Order';
import Product from '../models/Product';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import logger from '../utils/logger';

export const processPiTransaction = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Invalid input', details: errors.array() });
    }

    const product = await Product.findById(req.body.productId).session(session);
    if (!product || product.quantity <= 0) {
      return res.status(400).json({ error: 'Product out of stock' });
    }

    // Deduct product quantity
    product.quantity -= 1;
    await product.save({ session });

    // Create order record
    const order = new Order({
      paymentId: req.body.paymentId,
      productId: product._id,
      buyer: req.user._id,
    });

    await order.save({ session });
    await session.commitTransaction();

    res.status(201).json({
      message: 'Order processed successfully',
      order,
    });
  } catch (error) {
    await session.abortTransaction();
    logger.error(error.message);
    res.status(500).json({ error: 'Transaction failed. Please try again.' });
  } finally {
    session.endSession();
  }
};
