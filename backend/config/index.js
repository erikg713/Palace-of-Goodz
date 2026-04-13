import dotenv from 'dotenv';
dotenv.config();   // Load .env at the earliest point

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',

  // Database
  mongoURI: process.env.MONGO_URI,

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET,
    accessExpire: process.env.JWT_ACCESS_EXPIRE || '15m',
    refreshExpire: process.env.JWT_REFRESH_EXPIRE || '7d',
  },

  // Pi Network (imported from pi.js)
  pi: (await import('./pi.js')).default,

  // Other services (add as needed)
  cloudinary: (await import('./cloudinary.js')).default,
  email: (await import('./email.js')).default,
};

export default config;
