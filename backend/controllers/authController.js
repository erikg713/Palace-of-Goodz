// controllers/authController.js
import User from '../models/User.js';
import { verifyPiAuth } from '../utils/piVerification.js';

export const handlePiLogin = async (req, res) => {
  try {
    const { user, accessToken } = req.body;

    const isVerified = await verifyPiAuth(user, accessToken);
    if (!isVerified) return res.status(401).json({ error: 'User verification failed.' });

    let dbUser = await User.findOne({ uid: user.uid });
    if (!dbUser) {
      dbUser = await User.create({ uid: user.uid, username: user.username });
    }

    res.status(200).json({ uid: dbUser.uid, username: dbUser.username, role: dbUser.role });
  } catch (err) {
    console.error('Pi login error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
export const getProfile = async (req, res) => {
  const { user } = req;
  res.json({
    uid: user.uid,
    username: user.username,
    role: user.role,
  });
};
      
