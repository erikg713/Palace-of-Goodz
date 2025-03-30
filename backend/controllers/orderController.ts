// backend/controllers/orderController.ts
import { Request, Response } from 'express';
import Payment from '../models/Payment';

// Create a new payment
export const createPayment = async (req: Request, res: Response) => {
  try {
    const { amount, currency, status } = req.body;
    const payment = await Payment.create({ amount, currency, status });
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all payments
export const getPayments = async (req: Request, res: Response) => {
  try {
    const payments = await Payment.findAll();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get payment by ID
export const getPaymentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update payment status
export const updatePaymentStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    payment.status = status;
    await payment.save();
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete payment
export const deletePayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    await payment.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
