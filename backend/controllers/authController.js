import { Request, Response } from 'express'
import User from '../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
import { generateToken } from '../utils/token'
import { sanitizeUser } from '../utils/sanitizers'

// @desc    Register User
export const registerUser = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { piUsername, walletAddress, password } = req.body

    const existingUser = await User.findOne({ walletAddress })
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
      piUsername,
      walletAddress,
      password: hashedPassword,
      role: 'customer' // default role
    })

    await user.save()

    const token = generateToken(user._id, user.role)
    res.status(201).json({ token, user: sanitizeUser(user) })
  } catch (error) {
    console.error('❌ Register Error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

export const registerUser = (req, res) => {
  const { piUsername, walletAddress, password } = req.body;
  // Implement registration logic here (e.g., save user to database)
  res.status(201).json({ message: 'User registered successfully' });
};
// @desc    Login User
export const loginUser = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { walletAddress, password } = req.body
    const user = await User.findOne({ walletAddress })

    if (!user) {
      return res.status(400).json({ error: 'User not found' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' })
    }

    const token = generateToken(user._id, user.role)
    res.status(200).json({ token, user: sanitizeUser(user) })
  } catch (error) {
    console.error('❌ Login Error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}
// Handle Pi login requests
export const loginUser = async (req, res) => {
  const { uid, username } = req.body;

  if (!uid || !username) {
    return res.status(400).json({ error: 'Missing Pi credentials' });
  }

  // You can connect this to MongoDB or use a mock DB here
  const role = ['pi_admin_uid_1', 'pi_admin_uid_2'].includes(uid) ? 'admin' : 'customer';

  // Optional: Upsert user to DB
  // await UserModel.findOneAndUpdate({ uid }, { username, role }, { upsert: true });

  res.set({
    'x-user-id': uid,
    'x-user-username': username,
    'x-user-role': role,
  });

  res.json({ message: 'Login successful', uid, username, role });
};
