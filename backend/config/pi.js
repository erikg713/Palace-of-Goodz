/**
 * Pi Network Configuration
 * 
 * Central configuration for Pi Network integration (Authentication, Payments, etc.)
 */

import dotenv from 'dotenv';

// Load environment variables (safe to call multiple times)
dotenv.config();

const piConfig = {
  // === Core Pi App Credentials ===
  appId: process.env.PI_APP_ID,
  apiKey: process.env.PI_API_KEY,

  // === API Settings ===
  baseURL: process.env.PI_BASE_URL || 'https://api.minepi.com',
  appServerURL: process.env.APP_SERVER_URL || `http://localhost:${process.env.PORT || 5000}`,

  // === Feature Flags ===
  enableAuth: process.env.ENABLE_PI_AUTH !== 'false',        // default: true
  enablePayments: process.env.ENABLE_PI_PAYMENTS === 'true',

  // === Admin Access (Pi UIDs) ===
  adminUids: process.env.PI_ADMIN_UIDS
    ? process.env.PI_ADMIN_UIDS.split(',').map((uid) => uid.trim()).filter(Boolean)
    : [],

  // === Common Headers for Pi API calls ===
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Key ${process.env.PI_API_KEY || ''}`,
  },

  // === Scopes for Pi Authentication ===
  scopes: ['username', 'payments', 'wallet_address'],

  // === Payment Configuration ===
  payment: {
    currency: 'PI',
    minAmount: parseFloat(process.env.PI_MIN_PAYMENT) || 0.1,
    callbackUrl: `${process.env.APP_SERVER_URL || ''}/api/pi/payment/callback`,
  },

  // === Helper Methods ===
  isAdmin: (uid) => {
    if (!uid) return false;
    return piConfig.adminUids.includes(uid);
  },
};

export default piConfig;
