/**
 * Central Application Configuration
 * 
 * This is the main configuration file that aggregates all settings.
 * Import this file wherever you need app-wide config.
 */

import dotenv from 'dotenv';
dotenv.config();   // Load environment variables as early as possible

// Dynamic imports for modular config files
const loadConfig = async () => {
  const [piConfig, cloudinaryConfig, emailConfig] = await Promise.all([
    import('./pi.js').then(m => m.default),
    import('./cloudinary.js').then(m => m.default).catch(() => ({})),
    import('./email.js').then(m => m.default).catch(() => ({})),
  ]);

  return {
    // Environment & Server
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 5000,
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
    appServerUrl: process.env.APP_SERVER_URL || `http://localhost:${process.env.PORT || 5000}`,

    // Database
    mongoURI: process.env.MONGO_URI,

    // JWT Authentication
    jwt: {
      secret: process.env.JWT_SECRET,
      accessExpire: process.env.JWT_ACCESS_EXPIRE || '15m',
      refreshExpire: process.env.JWT_REFRESH_EXPIRE || '7d',
    },

    // Pi Network Integration
    pi: piConfig,

    // Optional Services (with graceful fallbacks)
    cloudinary: cloudinaryConfig,
    email: emailConfig,

    // Feature Flags
    enablePiAuth: process.env.ENABLE_PI_AUTH !== 'false',
    enablePiPayments: process.env.ENABLE_PI_PAYMENTS === 'true',
  };
};

// Export as a promise so we can await it if needed
const configPromise = loadConfig();

export default configPromise;

// Optional: Also export a synchronous getter (useful in some cases)
export const getConfig = async () => {
  return await configPromise;
};
