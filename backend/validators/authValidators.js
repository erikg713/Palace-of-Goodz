import { body } from 'express-validator';

export const registerValidation = [
  body('piUsername')
    .trim()
    .notEmpty()
    .withMessage('Username is required'),

  body('walletAddress')
    .trim()
    .notEmpty()
    .withMessage('Wallet address is required'),

  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/\d/)
    .withMessage('Password must contain at least one number')
    .matches(/[^A-Za-z0-9]/)
    .withMessage('Password must contain at least one special character')
];
