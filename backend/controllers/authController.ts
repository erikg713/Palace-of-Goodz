import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';

// Utility function to generate a JWT token
const generateToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '1h' });
};

// Register User
export const registerUser = [
  // Input validation
  body('piUsername').notEmpty().withMessage('Username is required'),
  body('walletAddress').notEmpty().withMessage('Wallet address is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { piUsername, walletAddress, password } = req.body;
      
      const existingUser = await User.findOne({ walletAddress });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({ piUsername, walletAddress, password: hashedPassword });
      await user.save();

      const token = generateToken(user._id);
      res.status(201).json({ token, user });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Failed to register user' });
    }
  }
];

// Login User
export const loginUser = [
  // Input validation
  body('walletAddress').notEmpty().withMessage('Wallet address is required'),
  body('password').notEmpty().withMessage('Password is required'),

  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { walletAddress, password } = req.body;
      const user = await User.findOne({ walletAddress });

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      const token = generateToken(user._id);
      res.status(200).json({ token, user });
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ error: 'Failed to login user' });
    }
  }
];
