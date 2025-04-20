import { verifyPiToken } from '../utils/piVerifier.js';
import User from '../models/User.js';
import PiAuthService from '../services/piAuthService'; // Your server-side Pi SDK logic
import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const accessToken = req.header('Authorization')?.replace('Bearer ', '');

  if (!accessToken) {
    return res.status(401).json({ error: 'Access denied. No Pi Network access token provided.' });
  }

  try {
    const piUser = await PiAuthService.verifyAccessToken(accessToken);
    if (!piUser) {
      return res.status(401).json({ error: 'Invalid Pi Network access token.' });
    }

    req.user = piUser; // Attach the verified Pi user info
    next();
  } catch (error) {
    logger.error('Pi Network auth failed', { error });
    res.status(401).json({ error: 'Pi Network authentication failed.' });
  }
};
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
