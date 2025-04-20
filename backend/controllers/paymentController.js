import Payment from '../models/Payment.js';
import PiPaymentService from '../services/piPaymentService';
import Order from '../models/Order';
import Product from '../models/Product';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import logger from '../utils/logger';

// Process the Pi Network transaction
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

    product.quantity -= 1;
    await product.save({ session });

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

// Verify payment
export const verifyPayment = async (req, res, next) => {
  // Implement Pi payment verification logic here
};
export const createPayment = async (req, res) => {
  try {
    const { paymentId, uid, amount, memo, metadata } = req.body;

    const newPayment = new Payment({ paymentId, uid, amount, memo, metadata, status: 'PENDING' });
    await newPayment.save();

    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Payment creation error' });
  }
};

export const completePayment = async (req, res) => {
  try {
    const { paymentId, txid } = req.body;

    const payment = await Payment.findOne({ paymentId });
    if (!payment) return res.status(404).json({ message: 'Payment not found' });

    payment.txid = txid;
    payment.status = 'COMPLETED';
    await payment.save();

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Payment completion error' });
  }
};

export const getPaymentStatus = async (req, res) => {
  try {
    const payment = await Payment.findOne({ paymentId: req.params.paymentId });
    if (!payment) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(payment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving payment status' });
  }
};
import Payment from '../models/Payment.js';
import axios from 'axios';

export const verifyPayment = async (req, res) => {
  try {
    const { paymentId } = req.body;

    const response = await axios.get(`https://api.minepi.com/v2/payments/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${process.env.PI_API_KEY}`
      }
    });

    const paymentData = response.data;
    const { transaction } = paymentData;

    if (transaction && transaction.txid) {
      await Payment.findOneAndUpdate(
        { paymentId },
        {
          status: 'completed',
          txId: transaction.txid,
        },
        { new: true }
      );
      return res.json({ message: 'Payment verified & completed.' });
    } else {
      return res.status(400).json({ message: 'Payment not yet completed.' });
    }
  } catch (err) {
    console.error('verifyPayment error:', err);
    res.status(500).json({ message: 'Payment verification failed.' });
  }
};

export const recordNewPayment = async (req, res) => {
  try {
    const { paymentId, amount, memo } = req.body;
    const existing = await Payment.findOne({ paymentId });
    if (existing) return res.status(400).json({ message: 'Duplicate payment' });

    const payment = await Payment.create({
      paymentId,
      uid: req.user.uid,
      username: req.user.username,
      amount,
      memo,
      status: 'pending',
    });

    res.json({ message: 'Payment recorded', payment });
  } catch (err) {
    console.error('recordNewPayment error:', err);
    res.status(500).json({ message: 'Error recording payment' });
  }
};
