import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register User
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { piUsername, walletAddress, password } = req.body;

        const existingUser = await User.findOne({ walletAddress });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ piUsername, walletAddress, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
        res.status(201).json({ token, userId: user._id });
    } catch (err) {
        res.status(500).json({ error: 'Failed to register user.', details: err.message });
    }
};

// Login User
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { walletAddress, password } = req.body;
        const user = await User.findOne({ walletAddress });

        if (!user) {
            return res.status(400).json({ error: 'Invalid Wallet Address or Password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid Wallet Address or Password.' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
        res.status(200).json({ token, userId: user._id });
    } catch (err) {
        res.status(500).json({ error: 'Failed to login user.', details: err.message });
    }
};
