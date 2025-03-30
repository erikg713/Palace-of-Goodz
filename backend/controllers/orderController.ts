import { Request, Response } from 'express';
import Order from '../models/Order';
import { withTransaction } from '../utils/transactionHelper';
import { check, validationResult } from 'express-validator';

// Helper function to validate request
const validateRequest = (req: Request, res: Response, validations: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
};

// Create Order
export const createOrder = [
  check('userId').notEmpty().withMessage('User ID is required.'),
  check('items').isArray({ min: 1 }).withMessage('Items array must not be empty.'),
  async (req: Request, res: Response) => {
    if (validateRequest(req, res, validationResult)) return;

    try {
      const order = new Order(req.body);
      await withTransaction(req.dbConnection, async (session) => {
        await order.save({ session });
        res.status(201).json(order);
      });
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to create order', details: error.message });
    }
  }
];

// Update Order Status
export const updateOrderStatus = [
  check('paymentId').notEmpty().withMessage('Payment ID is required.'),
  check('status').notEmpty().withMessage('Status is required.'),
  async (req: Request, res: Response) => {
    if (validateRequest(req, res, validationResult)) return;

    try {
      const { paymentId, status } = req.body;
      const order = await Order.findOneAndUpdate({ paymentId }, { status }, { new: true });
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.status(200).json(order);
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to update order status', details: error.message });
    }
  }
];
