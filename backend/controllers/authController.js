// controllers/authController.js
import axios from 'axios';
import User from '../models/User.js'; // Mongoose User model

export const verifyPiAuthToken = async (req, res) => {
  const { accessToken, user } = req.body;

  if (!accessToken || !user?.uid) {
    return res.status(400).json({ error: 'Missing Pi user info or token' });
  }

  try {
    const response = await axios.get(`https://api.minepi.com/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const piUser = response.data;
    if (piUser.uid !== user.uid) {
      return res.status(401).json({ error: 'Token validation failed' });
    }

    // Optional: Save or update user in your DB
    const dbUser = await User.findOneAndUpdate(
      { pi_uid: piUser.uid },
      { pi_username: piUser.username },
      { upsert: true, new: true }
    );

    res.json({ success: true, user: dbUser });
  } catch (err) {
    console.error('Pi login error:', err);
    res.status(500).json({ error: 'Pi auth failed' });
  }
};
