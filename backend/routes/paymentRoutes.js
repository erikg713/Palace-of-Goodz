import express from 'express';
import axios from 'axios';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();
const PI_API_KEY = process.env.PI_API_KEY;

// Approve the payment
router.post('/approve', authenticate, async (req, res) => {
  const { paymentId } = req.body;

  try {
    await axios.post(
      'https://api.minepi.com/payments/approve',
      { paymentId },
      {
        headers: {
          Authorization: `Key ${PI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Approval failed:", err.response?.data || err.message);
    res.status(500).json({ error: "Approval failed" });
  }
});

// Complete the payment
router.post('/complete', authenticate, async (req, res) => {
  const { paymentId, txid } = req.body;

  try {
    await axios.post(
      'https://api.minepi.com/payments/complete',
      { paymentId, txid },
      {
        headers: {
          Authorization: `Key ${PI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Optional: store transaction in DB here

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Completion failed:", err.response?.data || err.message);
    res.status(500).json({ error: "Completion failed" });
  }
});

export default router;
