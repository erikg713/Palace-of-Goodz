import express from 'express';
import { registerUser, loginUser } from '../controllers/authController';
import { validateRegister, validateLogin } from '../utils/validators';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import express from 'express';
import fetch from 'node-fetch';
import express from 'express'
import { registerUser, loginUser } from '../controllers/authController'
import { registerValidation, loginValidation } from '../validators/authValidators'
import asyncHandler from 'express-async-handler'

const router = express.Router()

router.post('/register', registerValidation, asyncHandler(registerUser))
router.post('/login', loginValidation, asyncHandler(loginUser))

export default router

const router = express.Router();
const PI_API_URL = 'https://api.minepi.com';

router.post('/verify', async (req, res) => {
  const { accessToken } = req.body;
  try {
    const response = await fetch(`${PI_API_URL}/me`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const user = await response.json();
    res.json({ verified: true, user });
  } catch (err) {
    console.error('Auth verification failed:', err);
    res.status(401).json({ verified: false });
  }
});

export default router;
const router = express.Router();

// Apply security headers
router.use(helmet());

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// Apply rate limiting to all requests
router.use(limiter);

// @route   POST /register
// @desc    Register a new user
// @access  Public
router.post('/register', validateRegister, registerUser);

// @route   POST /login
// @desc    Login a user
// @access  Public
router.post('/login', validateLogin, loginUser);

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default router;
