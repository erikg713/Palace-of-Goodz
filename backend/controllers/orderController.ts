import { Request, Response } from 'express';
import Order from '../models/Order'; // Ensure you have an Order model defined

// Create a new order
export const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, products, totalAmount } = req.body;
        if (!userId || !products || !Array.isArray(products) || !totalAmount) {
            res.status(400).json({ error: 'Missing or invalid order data.' });
            return;
        }

        const order = new Order({ user: userId, products, totalAmount, status: 'pending' });
        await order.save();

        res.status(201).json({ message: 'Order created successfully.', orderId: order._id });
    } catch (err: any) {
        res.status(500).json({ error: 'Failed to create order.', details: err.message });
    }
};

// Retrieve orders for a specific user
export const getOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        if (!userId) {
            res.status(400).json({ error: 'User ID is required.' });
            return;
        }

        const orders = await Order.find({ user: userId });
        res.status(200).json(orders);
    } catch (err: any) {
        res.status(500).json({ error: 'Failed to fetch orders.', details: err.message });
    }
};
