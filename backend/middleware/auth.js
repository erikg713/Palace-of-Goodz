// middleware/auth.js

import { verifyUser } from '../utils/verifyUser.js';

// List of admin Pi usernames
const ADMIN_USERNAMES = ['your_pi_username'];

export const authenticate = async (req, res, next) => {
  // Expecting the token in the Authorization header in the form "Bearer <token>"
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    // verifyUser should decode/validate the token and return the user object or null if invalid
    const user = await verifyUser(token);
    if (!user) {
      return res.status(403).json({ error: 'Invalid user' });
    }

    // Inject role based on Pi username:
    // If username is found in ADMIN_USERNAMES, assign 'admin' role; otherwise, assign 'user'.
    user.roles = ADMIN_USERNAMES.includes(user.username) ? ['admin'] : ['user'];

    req.user = user;
    next();
  } catch (err) {
    console.error('Authentication error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
