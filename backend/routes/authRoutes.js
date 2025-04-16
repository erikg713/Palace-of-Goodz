import express from 'express';
import asyncHandler from 'express-async-handler';
import axios from 'axios';

const router = express.Router();

router.post('/verify', asyncHandler(async (req, res) => {
  const { accessToken } = req.body;
  if (!accessToken) {
    return res.status(400).json({ error: 'Access token is required' });
  }

  try {
    const response = await axios.get('https://api.minepi.com/v2/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const user = response.data;
    res.json({ verified: true, user });
  } catch (err) {
    console.error('❌ Pi Network Auth Verification Error:', err.message);
    res.status(401).json({ verified: false, error: 'Failed to verify access token' });
  }
}));

export default router;
