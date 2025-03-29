import express from 'express';
import { registerUser, loginUser } from '../controllers/authController';
import { validateRegister, validateLogin } from '../utils/validators';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

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
