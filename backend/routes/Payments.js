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

/**
 * Create a new A2U payment
 * Endpoint: POST /payments/create
 * Expected body: { uid, product_id, amount, memo }
 */
router.post('/create', async (req, res) => {
  try {
    const { uid, product_id, amount, memo } = req.body;

    if (!uid || !product_id || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Define payment data following Pi's API
    const paymentData = {
      amount,
      memo,
      metadata: { product_id },
      uid,
    };

    // Create payment in Pi Network and get a payment ID
    const paymentId = await pi.createPayment(paymentData);

    // Store the payment information in the database
    const query = `
      INSERT INTO payments (uid, product_id, amount, memo, payment_id)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
    const values = [uid, product_id, amount, memo, paymentId];
    const result = await db.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Submit a payment to the Pi Blockchain
 * Endpoint: POST /payments/submit
 * Expected body: { payment_id }
 */
router.post('/submit', async (req, res) => {
  try {
    const { payment_id } = req.body;

    if (!payment_id) {
      return res.status(400).json({ error: 'Missing payment ID' });
    }

    // Submit the payment transaction to the Pi Blockchain
    const txid = await pi.submitPayment(payment_id);

    // Update the transaction ID in the database
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
    console.error('Error submitting payment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Complete a payment
 * Endpoint: POST /payments/complete
 * Expected body: { payment_id, txid }
 */
router.post('/complete', async (req, res) => {
  try {
    const { payment_id, txid } = req.body;

    if (!payment_id || !txid) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Complete the payment in the Pi system
    const completedPayment = await pi.completePayment(payment_id, txid);

    res.json(completedPayment);
  } catch (error) {
    console.error('Error completing payment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Cancel a payment
 * Endpoint: POST /payments/cancel
 * Expected body: { payment_id }
 */
router.post('/cancel', async (req, res) => {
  try {
    const { payment_id } = req.body;

    if (!payment_id) {
      return res.status(400).json({ error: 'Missing payment ID' });
    }

    // Cancel the payment using Pi Network's SDK
    const cancelledPayment = await pi.cancelPayment(payment_id);

    res.json(cancelledPayment);
  } catch (error) {
    console.error('Error cancelling payment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Fetch incomplete payments from the server
 * Endpoint: GET /payments/incomplete
 */
router.get('/incomplete', async (req, res) => {
  try {
    // Fetch any incomplete payment (0 or 1 payment object)
    const incompletePayments = await pi.getIncompleteServerPayments();

    res.json(incompletePayments);
  } catch (error) {
    console.error('Error fetching incomplete payments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Get details of a specific payment
 * Endpoint: GET /payments/:id
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = `SELECT * FROM payments WHERE id = $1;`;
    const result = await db.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching payment details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
