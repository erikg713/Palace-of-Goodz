import { body } from 'express-validator'

export const registerValidation = [
  body('piUsername').notEmpty().withMessage('Username is required'),
  body('walletAddress').notEmpty().withMessage('Wallet address is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
]

export const loginValidation = [
  body('walletAddress').notEmpty().withMessage('Wallet address is required'),
  body('password').notEmpty().withMessage('Password is required')
]
