/**
 * Pi Network Configuration
 * 
 * Central configuration for Pi Network integration (Authentication, Payments, etc.)
 */

import dotenv from 'dotenv';
import { createAdminChecker, parseAdminUids } from './authHelpers.js';

// Load environment variables (safe to call multiple times)
dotenv.config();

// Parse admin UIDs once at startup
const adminUids = parseAdminUids(process.env.PI_ADMIN_UIDS);

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
  adminUids,

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
  isAdmin: createAdminChecker(adminUids),
};

export default piConfig;
