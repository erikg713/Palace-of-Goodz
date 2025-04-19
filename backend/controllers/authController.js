import axios from 'axios';
import crypto from 'crypto';
import User from '../models/User.js';

// Helper to verify signature (security from Pi SDK)
function verifySignature(payload, signature) {
  const hmac = crypto.createHmac('sha256', process.env.PI_SECRET_KEY);
  hmac.update(JSON.stringify(payload));
  const digest = hmac.digest('hex');
  return digest === signature;
}

// Pi login controller - for frontend SDK login
export const piLoginController = async (req, res) => {
  const { user, payload, signature } = req.body;

  try {
    // 1. Signature check
    const valid = verifySignature(payload, signature);
    if (!valid) return res.status(403).json({ success: false, message: 'Invalid signature' });

    // 2. Optional: Validate against Pi API
    const piRes = await axios.post(
      'https://api.minepi.com/v2/me',
      {},
      {
        headers: {
          Authorization: `Bearer ${payload.accessToken}`,
        },
      }
    );

    if (piRes.data.username !== user.username) {
      return res.status(401).json({ success: false, message: 'Username mismatch' });
    }

    // 3. Create or fetch user
    let existing = await User.findOne({ uid: user.uid });
    if (!existing) {
      existing = await User.create({
        uid: user.uid,
        username: user.username,
        roles: [user.uid === process.env.ADMIN_PI_UID ? 'admin' : 'user'],
      });
    }

    return res.status(200).json({ success: true, user: existing });
  } catch (err) {
    console.error('[Pi Login Error]', err);
    return res.status(500).json({ success: false, message: 'Pi login failed' });
  }
};

// Token re-verification controller
export const verifyPiUserController = async (req, res) => {
  const { accessToken, user } = req.body;

  if (!accessToken || !user?.uid) {
    return res.status(400).json({ error: 'Missing Pi credentials' });
  }

  try {
    const response = await axios.get('https://api.minepi.com/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.data.uid !== user.uid) {
      return res.status(401).json({ error: 'Token and UID mismatch' });
    }

    const dbUser = await User.findOne({ uid: user.uid });

    return res.status(200).json({
      verified: true,
      user: {
        uid: user.uid,
        username: user.username,
        roles: dbUser?.roles || ['user'],
      },
    });
  } catch (error) {
    console.error('Verification error:', error);
    return res.status(500).json({ error: 'Verification failed' });
  }
};
