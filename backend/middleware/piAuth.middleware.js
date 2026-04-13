import piConfig from '../config/pi.js';

/**
 * Pi Network Authentication Middleware
 * Use this when you want to allow login via Pi App
 */
export const piAuth = async (req, res, next) => {
  const piUid = req.headers['x-pi-uid'] || req.body.piUid || req.query.piUid;

  if (!piUid) {
    return res.status(401).json({
      success: false,
      message: 'Pi UID is required',
    });
  }

  // Optional: Verify with Pi API (advanced)
  // For now, we just attach it to request
  req.piUid = piUid;
  req.isPiAdmin = piConfig.isAdmin(piUid);

  next();
};

/**
 * Combined: Require either JWT or valid Pi UID
 */
export const protectOrPi = async (req, res, next) => {
  // First try normal JWT auth
  if (req.headers.authorization?.startsWith('Bearer')) {
    return protect(req, res, next);
  }

  // Fallback to Pi UID
  return piAuth(req, res, next);
};
