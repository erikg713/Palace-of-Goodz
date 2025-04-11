import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

router.post('/approve', async (req, res) => {
  const { paymentId } = req.body;
  try {
    console.log('Approving payment:', paymentId);
    res.json({ status: 'approved' });
  } catch (err) {
    console.error('Payment approval error:', err);
    res.status(500).json({ status: 'failed' });
  }
});

router.post('/complete', async (req, res) => {
  const { paymentId, txid, username, productId } = req.body;
  try {
    const newOrder = new Order({ paymentId, txid, username, productId, status: 'completed' });
    await newOrder.save();
    res.json({ success: true });
  } catch (err) {
    console.error('Payment completion error:', err);
    res.status(500).json({ success: false });
  }
});

export default router;


import express from 'express';
import PiNetwork from 'pi-backend';
import dotenv from 'dotenv';
import { db } from '../config/db.js'; // Ensure your DB connection exports a `query` method

dotenv.config();

const router = express.Router();

// Initialize Pi Network SDK using environment variables
const apiKey = process.env.PI_API_KEY;
const walletPrivateSeed = process.env.PI_WALLET_PRIVATE_SEED;
const pi = new PiNetwork(apiKey, walletPrivateSeed);

// Reusable function to handle errors
const handleError = (res, error, message = 'Internal server error') => {
  console.error(message, error);
  res.status(500).json({ error: message });
};

// Create a new A2U payment
router.post('/create', async (req, res) => {
  const { uid, product_id, amount, memo } = req.body;
  if (!uid || !product_id || !amount) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const paymentData = { amount, memo, metadata: { product_id }, uid };
    const paymentId = await pi.createPayment(paymentData);

    const query = `
      INSERT INTO payments (uid, product_id, amount, memo, payment_id)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
    const values = [uid, product_id, amount, memo, paymentId];
    const result = await db.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    handleError(res, error, 'Error creating payment');
  }
});

// Submit a payment to the Pi Blockchain
router.post('/submit', async (req, res) => {
  const { payment_id } = req.body;
  if (!payment_id) {
    return res.status(400).json({ error: 'Missing payment ID' });
  }
  try {
    const txid = await pi.submitPayment(payment_id);

    const query = `
      UPDATE payments
      SET txid = $1
      WHERE payment_id = $2
      RETURNING *;
    `;
    const values = [txid, payment_id];
    const result = await db.query(query, values);

    res.json(result.rows[0]);
  } catch (error) {
    handleError(res, error, 'Error submitting payment');
  }
});

// Complete a payment
router.post('/complete', async (req, res) => {
  const { payment_id, txid } = req.body;
  if (!payment_id || !txid) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const completedPayment = await pi.completePayment(payment_id, txid);
    res.json(completedPayment);
  } catch (error) {
    handleError(res, error, 'Error completing payment');
  }
});

// Cancel a payment
router.post('/cancel', async (req, res) => {
  const { payment_id } = req.body;
  if (!payment_id) {
    return res.status(400).json({ error: 'Missing payment ID' });
  }
  try {
    const cancelledPayment = await pi.cancelPayment(payment_id);
    res.json(cancelledPayment);
  } catch (error) {
    handleError(res, error, 'Error cancelling payment');
  }
});

// Fetch incomplete payments
router.get('/incomplete', async (req, res) => {
  try {
    const incompletePayments = await pi.getIncompleteServerPayments();
    res.json(incompletePayments);
  } catch (error) {
    handleError(res, error, 'Error fetching incomplete payments');
  }
});

// Get details of a specific payment
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = `SELECT * FROM payments WHERE id = $1;`;
    const result = await db.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    handleError(res, error, 'Error fetching payment details');
  }
});

export default router;
// backend/routes/paymentRoutes.js
const express = require('express');
const {
  createPayment,
  getPayments,
  getPaymentById,
  updatePaymentStatus,
  deletePayment,
} = require('../controllers/orderController');

const router = express.Router();

router.post('/payments', createPayment);
router.get('/payments', getPayments);
router.get('/payments/:id', getPaymentById);
router.put('/payments/:id', updatePaymentStatus);
router.delete('/payments/:id', deletePayment);

module.exports = router;
