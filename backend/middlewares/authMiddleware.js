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
