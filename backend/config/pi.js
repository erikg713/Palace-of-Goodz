/**
 * Pi Network Configuration
 * 
 * This file contains configuration related to Pi Network integration
 * (Payments, Authentication, App Server, etc.)
 */
/**
 * Pi Network Configuration
 */

const piConfig = {
  appId: process.env.PI_APP_ID,
  apiKey: process.env.PI_API_KEY,
  baseURL: process.env.PI_BASE_URL || 'https://api.minepi.com',
  appServerURL: process.env.APP_SERVER_URL || `http://localhost:${process.env.PORT || 5000}`,

  enableAuth: process.env.ENABLE_PI_AUTH !== 'false',
  enablePayments: process.env.ENABLE_PI_PAYMENTS === 'true',

  adminUids: process.env.PI_ADMIN_UIDS
    ? process.env.PI_ADMIN_UIDS.split(',').map((uid) => uid.trim())
    : [],

  payment: {
    currency: 'PI',
    minAmount: parseFloat(process.env.PI_MIN_PAYMENT) || 0.1,
    callbackUrl: `${process.env.APP_SERVER_URL}/api/pi/payment/callback`,
  },
};

export default piConfig;
import dotenv from 'dotenv';
dotenv.config();

const piConfig = {
  // Pi Network App Credentials
  appId: process.env.PI_APP_ID || 'your-pi-app-id-here',
  apiKey: process.env.PI_API_KEY || 'your-pi-api-key-here',
  
  // Pi Network API Base URL
  baseURL: process.env.PI_BASE_URL || 'https://api.minepi.com',
  
  // App Server URL (your backend)
  appServerURL: process.env.APP_SERVER_URL || 'https://yourdomain.com',
  
  // Authentication & Payment Settings
  enablePiAuth: process.env.ENABLE_PI_AUTH === 'true' || true,
  enablePiPayments: process.env.ENABLE_PI_PAYMENTS === 'true' || false,
  
  // Common headers for Pi API requests
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Key ${process.env.PI_API_KEY}`,
  },

  // Pi Network Scopes (for authentication)
  scopes: [
    'username',
    'payments',
    'wallet_address'
  ],

  // Payment Configuration
  payment: {
    defaultCurrency: 'PI',
    minimumAmount: 0.1,
    callbackURL: `${process.env.APP_SERVER_URL}/api/pi/payment/callback`,
  },

  // Admin Pi UIDs (for manual admin checks - use with caution)
  adminUids: process.env.PI_ADMIN_UIDS 
    ? process.env.PI_ADMIN_UIDS.split(',').map(uid => uid.trim())
    : ['your-admin-pi-uid-here'],
};

export default piConfig;
