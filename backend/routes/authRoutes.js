import express from 'express'
import asyncHandler from 'express-async-handler'
import fetch from 'node-fetch'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'

import { registerUser, loginUser } from '../controllers/authController'
import { registerValidation, loginValidation } from '../validators/authValidators'

const router = express.Router()

// Middleware: Helmet for security headers
router.use(helmet())

// Middleware: Rate limiting (100 requests per 15 min per IP)
router.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
}))

// ----------------------------------------
// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerValidation, asyncHandler(registerUser))

// ----------------------------------------
// @route   POST /api/auth/login
// @desc    Login a user
// @access  Public
router.post('/login', loginValidation, asyncHandler(loginUser))

// ----------------------------------------
// @route   POST /api/auth/verify
// @desc    Verify Pi Network access token
// @access  Public
router.post('/verify', asyncHandler(async (req, res) => {
  const { accessToken } = req.body
  if (!accessToken) {
    return res.status(400).json({ error: 'Access token is required' })
  }

  try {
    const response = await fetch('https://api.minepi.com/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    if (!response.ok) {
      throw new Error('Invalid token')
    }

    const user = await response.json()
    res.json({ verified: true, user })
  } catch (err) {
    console.error('❌ Pi Network Auth Verification Error:', err.message)
    res.status(401).json({ verified: false, error: 'Failed to verify access token' })
  }
}))

// ----------------------------------------
// Global error handler (optional per-router)
router.use((err, req, res, next) => {
  console.error('Unhandled Auth Route Error:', err.stack)
  res.status(500).json({ error: 'Something broke!' })
})

export default router
import express from 'express';
import { loginUser } from '../controllers/authController.js';
const router = express.Router();

router.post('/login', loginUser);

export default router;
