import { body, param, query, validationResult } from 'express-validator';

// Middleware to handle validation errors
export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      status: 'error',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

// User Registration Validation
export const registerValidation = [
  body('piUsername')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_-]+$/).withMessage('Username can only contain letters, numbers, underscores and hyphens'),

  body('email')
    .optional()
    .isEmail().withMessage('Must provide a valid email address')
    .normalizeEmail(),
    
  body('walletAddress')
    .trim()
    .notEmpty().withMessage('Wallet address is required')
    .matches(/^(0x)?[0-9a-fA-F]{40}$/).withMessage('Must provide a valid Ethereum wallet address'),

  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[^A-Za-z0-9]/).withMessage('Password must contain at least one special character'),
    
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
    
  validateRequest
];

// Login Validation
export const loginValidation = [
  body('piUsername').trim().notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
  validateRequest
];

// Password Reset Request Validation
export const passwordResetRequestValidation = [
  body('email').isEmail().withMessage('Must provide a valid email address'),
  validateRequest
];

// Password Reset Validation
export const passwordResetValidation = [
  body('token').notEmpty().withMessage('Reset token is required'),
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[^A-Za-z0-9]/).withMessage('Password must contain at least one special character'),
  validateRequest
];

// Product Creation/Update Validation
export const productValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Product name is required')
    .isLength({ max: 100 }).withMessage('Product name cannot exceed 100 characters'),
    
  body('description')
    .trim()
    .optional()
    .isLength({ max: 1000 }).withMessage('Description cannot exceed 1000 characters'),
    
  body('price')
    .isNumeric().withMessage('Price must be a number')
    .isFloat({ min: 0 }).withMessage('Price cannot be negative'),
    
  body('category')
    .optional()
    .isString().withMessage('Category must be a string'),
    
  body('imageUrl')
    .optional()
    .isURL().withMessage('Image URL must be a valid URL'),
    
  validateRequest
];

// Order Validation
export const orderValidation = [
  body('products')
    .isArray({ min: 1 }).withMessage('Order must contain at least one product'),
    
  body('products.*.productId')
    .notEmpty().withMessage('Product ID is required')
    .isMongoId().withMessage('Invalid product ID format'),
    
  body('products.*.quantity')
    .isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    
  body('shippingAddress')
    .notEmpty().withMessage('Shipping address is required'),
    
  body('paymentMethod')
    .notEmpty().withMessage('Payment method is required')
    .isIn(['crypto', 'pi', 'credit']).withMessage('Invalid payment method'),
    
  validateRequest
];

// Payment Validation
export const paymentValidation = [
  body('orderId')
    .notEmpty().withMessage('Order ID is required')
    .isMongoId().withMessage('Invalid order ID format'),
    
  body('amount')
    .isNumeric().withMessage('Amount must be a number')
    .isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0'),
    
  body('currency')
    .notEmpty().withMessage('Currency is required')
    .isIn(['PI', 'ETH', 'USD']).withMessage('Invalid currency'),
    
  body('paymentMethod')
    .notEmpty().withMessage('Payment method is required')
    .isIn(['crypto', 'pi', 'credit']).withMessage('Invalid payment method'),
    
  body('transactionId')
    .optional()
    .isString().withMessage('Transaction ID must be a string'),
    
  validateRequest
];

// ID Parameter Validation
export const validateObjectId = [
  param('id')
    .isMongoId().withMessage('Invalid ID format'),
  validateRequest
];

// Pagination Parameters Validation
export const paginationValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
    
  query('sort')
    .optional()
    .isString().withMessage('Sort must be a string'),
    
  validateRequest
];

// User Update Validation
export const updateUserValidation = [
  body('fullName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage('Full name must be between 2 and 50 characters'),
    
  body('email')
    .optional()
    .isEmail().withMessage('Must provide a valid email address')
    .normalizeEmail(),
    
  body('profileImage')
    .optional()
    .isURL().withMessage('Profile image must be a valid URL'),
    
  validateRequest
];

// Wallet Update Validation
export const walletValidation = [
  body('walletAddress')
    .trim()
    .notEmpty().withMessage('Wallet address is required')
    .matches(/^(0x)?[0-9a-fA-F]{40}$/).withMessage('Must provide a valid Ethereum wallet address'),
    
  body('walletType')
    .optional()
    .isIn(['ethereum', 'pi', 'other']).withMessage('Invalid wallet type'),
    
  validateRequest
];
