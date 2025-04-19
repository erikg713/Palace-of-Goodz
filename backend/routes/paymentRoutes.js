const express = require('express');
const router = express.Router();
const verifyPiToken = require('../middlewares/piAuth');

router.get('/profile', verifyPiToken, async (req, res) => {
  const user = req.piUser;
  res.json({ message: `Welcome, ${user.username}` });
});import express from 'express';
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
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Completion failed:", err.response?.data || err.message);
    res.status(500).json({ error: "Completion failed" });
  }
});

export default router;
// routes/payments.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/approve', async (req, res) => {
  const { paymentId } = req.body;

  try {
    const response = await axios.post(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {}, {
      headers: { Authorization: `Key ${process.env.PI_API_KEY}` }
    });

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Approval failed' });
  }
});

router.post('/complete', async (req, res) => {
  const { paymentId, txid } = req.body;

  try {
    const response = await axios.post(`https://api.minepi.com/v2/payments/${paymentId}/complete`, { txid }, {
      headers: { Authorization: `Key ${process.env.PI_API_KEY}` }
    });

    // TODO: Update your order as "paid" here
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Completion failed' });
  }
});

module.exports = router;
