import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();
const ADMIN_UIDS = ['your-admin-pi-uid']; // Replace with real UID

router.get('/orders', async (req, res) => {
  const { admin } = req.query;
  if (!ADMIN_UIDS.includes(admin)) {
    return res.status(403).json({ error: 'Access denied' });
  }
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    console.error('Error retrieving orders:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

export default router;
