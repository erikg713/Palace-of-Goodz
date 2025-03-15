import { Request, Response } from 'express';
import Order from '../models/Order';
import { withTransaction } from '../utils/transactionHelper';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = new Order(req.body);
    await withTransaction(req.dbConnection, async (session) => {
      await order.save({ session });
      res.status(201).json(order);
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { paymentId, status } = req.body;
    const order = await Order.findOneAndUpdate({ paymentId }, { status }, { new: true });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
};
