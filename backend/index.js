// Project: Palace of Goodz // Directory: backend/ // File: backend/index.js

import express from 'express' import cors from 'cors' import dotenv from 'dotenv' import fetch from 'node-fetch' import mongoose from 'mongoose'

dotenv.config() const app = express() app.use(cors()) app.use(express.json())

// MongoDB Connection mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }) .then(() => console.log('Connected to MongoDB')) .catch(err => console.error('MongoDB connection error:', err))

// Order Schema const Order = mongoose.model('Order', new mongoose.Schema({ username: String, productId: String, txid: String, paymentId: String, status: { type: String, default: 'pending' }, createdAt: { type: Date, default: Date.now } }))

const PI_API_URL = 'https://api.minepi.com';

// Pi Authentication Verification Endpoint app.post('/auth/verify', async (req, res) => { const { accessToken } = req.body; try { const response = await fetch(${PI_API_URL}/me, { headers: { Authorization: Bearer ${accessToken} } }); const user = await response.json(); res.json({ verified: true, user }); } catch (err) { console.error('Auth verification failed:', err); res.status(401).json({ verified: false }); } });

// Pi Payment Completion Endpoint app.post('/payment/complete', async (req, res) => { const { paymentId, txid, username, productId } = req.body; try { const newOrder = new Order({ paymentId, txid, username, productId, status: 'completed' }); await newOrder.save(); res.json({ success: true }); } catch (err) { console.error('Payment completion error:', err); res.status(500).json({ success: false }); } });

const PORT = process.env.PORT || 3000; app.listen(PORT, () => console.log(Backend running on port ${PORT}));
// Project: Palace of Goodz // Directory: backend/ // File: backend/index.js

import express from 'express' import cors from 'cors' import dotenv from 'dotenv' import fetch from 'node-fetch' import mongoose from 'mongoose'

dotenv.config() const app = express() app.use(cors()) app.use(express.json())

// MongoDB Connection mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }) .then(() => console.log('Connected to MongoDB')) .catch(err => console.error('MongoDB connection error:', err))

// Order Schema const Order = mongoose.model('Order', new mongoose.Schema({ username: String, productId: String, txid: String, paymentId: String, status: { type: String, default: 'pending' }, createdAt: { type: Date, default: Date.now } }))

const PI_API_URL = 'https://api.minepi.com'; const ADMIN_UIDS = process.env.ADMIN_UIDS?.split(',') || []

// Pi Authentication Verification Endpoint app.post('/auth/verify', async (req, res) => { const { accessToken } = req.body; try { const response = await fetch(${PI_API_URL}/me, { headers: { Authorization: Bearer ${accessToken} } }); const user = await response.json(); res.json({ verified: true, user }); } catch (err) { console.error('Auth verification failed:', err); res.status(401).json({ verified: false }); } });

// Pi Payment Approval Endpoint app.post('/payment/approve', async (req, res) => { const { paymentId } = req.body; try { console.log('Approving payment:', paymentId); // TODO: verify product availability, user quota, etc. res.json({ status: 'approved' }); } catch (err) { console.error('Payment approval error:', err); res.status(500).json({ status: 'failed' }); } });

// Pi Payment Completion Endpoint app.post('/payment/complete', async (req, res) => { const { paymentId, txid, username, productId } = req.body; try { const newOrder = new Order({ paymentId, txid, username, productId, status: 'completed' }); await newOrder.save(); res.json({ success: true }); } catch (err) { console.error('Payment completion error:', err); res.status(500).json({ success: false }); } });

// Admin-only Order Fetch Route app.get('/orders', async (req, res) => { const { admin } = req.query if (!ADMIN_UIDS.includes(admin)) { return res.status(403).json({ error: 'Access denied' }) } try { const orders = await Order.find().sort({ createdAt: -1 }) res.json({ orders }) } catch (err) { console.error('Fetch orders error:', err) res.status(500).json({ error: 'Server error' }) } })

const PORT = process.env.PORT || 3000; app.listen(PORT, () => console.log(Backend running on port ${PORT}));


