import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register a new user
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { piUsername, walletAddress, password } = req.body;
        if (!piUsername || !walletAddress || !password) {
            res.status(400).json({ error: 'Missing required fields: piUsername, walletAddress, and password.' });
            return;
        }

        const existingUser = await User.findOne({ walletAddress });
        if (existingUser) {
            res.status(400).json({ error: 'User already exists.' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ piUsername, walletAddress, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
        res.status(201).json({ token, userId: user._id });
    } catch (err: any) {
        res.status(500).json({ error: 'Failed to register user.', details: err.message });
    }
};

// Log in an existing user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { walletAddress, password } = req.body;
        if (!walletAddress || !password) {
            res.status(400).json({ error: 'Missing walletAddress or password.' });
            return;
        }
        const user = await User.findOne({ walletAddress });
        if (!user) {
            res.status(400).json({ error: 'Invalid wallet address or password.' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ error: 'Invalid wallet address or password.' });
            return;
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
        res.status(200).json({ token, userId: user._id });
    } catch (err: any) {
        res.status(500).json({ error: 'Failed to login user.', details: err.message });
    }
};
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Extract the JWT token
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};
