import { verifyPiToken } from '../utils/piVerifier.js';
import User from '../models/User.js';

export const piAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.headers['x-pi-auth'];
    if (!token) return res.status(401).json({ message: 'Pi token missing' });

    const userPayload = await verifyPiToken(token);
    if (!userPayload || !userPayload.uid) {
      return res.status(401).json({ message: 'Invalid Pi token' });
    }

    let user = await User.findOne({ uid: userPayload.uid });
    if (!user) {
      user = await User.create({
        uid: userPayload.uid,
        username: userPayload.username,
      });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Auth Error:', err);
    res.status(401).json({ message: 'Pi authentication failed' });
  }
};
