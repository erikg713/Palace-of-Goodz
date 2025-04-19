import crypto from 'crypto';
import axios from 'axios';
import User from '../models/User.js';

/**
 * Verify the HMAC-SHA256 signature of the Pi payload
 */
function verifySignature(payload, signature) {
  const hmac = crypto.createHmac('sha256', process.env.PI_SECRET_KEY);
  hmac.update(JSON.stringify(payload));
  const digest = hmac.digest('hex');
  return digest === signature;
}

/**
 * Main login handler for Pi users
 */
export const piLoginController = async (req, res) => {
  const { user, payload, signature } = req.body;

  if (!user || !payload || !signature) {
    return res.status(400).json({ success: false, message: 'Missing Pi auth data' });
  }

  try {
    // Step 1: Verify signature
    const isValidSignature = verifySignature(payload, signature);
    if (!isValidSignature) {
      return res.status(403).json({ success: false, message: 'Invalid signature' });
    }

    // Step 2 (optional): Verify against Pi API
    const piResponse = await axios.post(
      'https://api.minepi.com/v2/me',
      {},
      {
        headers: {
          Authorization: `Bearer ${payload.accessToken}`,
        },
      }
    );

    if (piResponse.data.username !== user.username) {
      return res.status(401).json({ success: false, message: 'Pi user mismatch' });
    }

    // Step 3: Find or create user in DB
    let dbUser = await User.findOne({ uid: user.uid });
    if (!dbUser) {
      dbUser = await User.create({
        uid: user.uid,
        username: user.username,
        roles: [process.env.ADMIN_PI_UID === user.uid ? 'admin' : 'user'],
        joined: new Date(),
      });
    }

    return res.status(200).json({ success: true, user: dbUser });
  } catch (err) {
    console.error('[Pi Login Error]', err);
    return res.status(500).json({ success: false, message: 'Server error during Pi login' });
  }
};
