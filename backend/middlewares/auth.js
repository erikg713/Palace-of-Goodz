import jwt from 'jsonwebtoken';

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
