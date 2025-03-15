import mongoose from 'mongoose';
import PiPaymentService from '../services/piPaymentService';
import Product from '../models/Product';
import Order from '../models/Order';

export const processPiTransaction = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Step 1: Fetch Product Details
    const product = await Product.findById(req.body.productId).session(session);
    if (!product) throw new Error('Product not found');

    // Step 2: Deduct Product Quantity
    product.quantity -= 1;
    await product.save({ session });

    // Step 3: Create Order
    const order = new Order({
      paymentId: req.body.paymentId,
      productId: product._id,
      buyer
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Extract the JWT token
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};
