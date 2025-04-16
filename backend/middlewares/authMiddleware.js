import jwt from 'jsonwebtoken';
export const authMiddleware = (req, res, next) => {
  const uid = req.headers['x-user-id']
  const role = req.headers['x-user-role'] // e.g. "admin" or "customer"

  if (!uid || !role) {
    return res.status(401).json({ error: 'Unauthorized: Missing user credentials' })
  }

  req.user = { uid, role }
  next()
}
import jwt from 'jsonwebtoken';

export const protectRoute = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Forbidden' });
  }
};
// List of admin Pi usernames (if you want to promote certain users to admin)
const ADMIN_USERNAMES = ['your_pi_username'];

// JWT-based authentication middleware
export const authMiddleware = (req, res, next) => {
  // Expect token in header: "Authorization: Bearer <token>"
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1]; // extracts token from "Bearer token"
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Token missing' });
  }

  try {
    // Verify token using the secret defined in your .env file
    const user = jwt.verify(token, process.env.JWT_SECRET);

    // Optionally, set roles based on username
    user.roles = ADMIN_USERNAMES.includes(user.username) ? ['admin'] : ['user'];

    // Attach user information to request object for downstream use
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};
