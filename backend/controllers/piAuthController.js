import crypto from 'crypto'
import axios from 'axios'
import User from '../models/User.js' // Mongo model
import axios from 'axios';

export const verifyPiUser = async (req, res) => {
  const { user, accessToken } = req.body;

  if (!user || !accessToken) {
    return res.status(400).json({ error: 'Missing Pi user data.' });
  }

  try {
    // Validate token with Pi servers
    const response = await axios.get(`https://api.minepi.com/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (response.data.uid !== user.uid) {
      return res.status(401).json({ error: 'Invalid user token.' });
    }

    // Check for admin
    const role = process.env.ADMIN_PI_UID === user.uid ? 'admin' : 'user';

    // You can save user to DB if needed here

    res.status(200).json({
      user: {
        uid: user.uid,
        username: user.username,
        role,
      }
    });
  } catch (error) {
    console.error('Pi user verification failed:', error.message);
    res.status(500).json({ error: 'Pi verification failed' });
  }
};
export const verifyPiUser = async (req, res) => {
  const { user, payload, signature } = req.body

  try {
    // Step 1: Verify the signature from Pi Server
    const isValid = verifySignature(payload, signature)
    if (!isValid) {
      return res.status(403).json({ success: false, message: 'Invalid signature' })
    }

    // Step 2: Confirm identity against Pi Platform API (optional double-check)
    const piRes = await axios.post(
      'https://api.minepi.com/v2/me',
      {},
      {
        headers: {
          Authorization: `Bearer ${payload.accessToken}`,
        },
      }
    )

    if (piRes.data.username !== user.username) {
      return res.status(401).json({ success: false, message: 'Username mismatch' })
    }

    // Step 3: Find or create user
    let existing = await User.findOne({ username: user.username })

    if (!existing) {
      existing = new User({
        username: user.username,
        role: 'user',
        joined: new Date(),
      })
      await existing.save()
    }

    return res.json({ success: true, user: existing })
  } catch (err) {
    console.error('Auth error:', err)
    return res.status(500).json({ success: false, message: 'Auth failed' })
  }
}

function verifySignature(payload, signature) {
  const hmac = crypto.createHmac('sha256', process.env.PI_SECRET_KEY)
  hmac.update(JSON.stringify(payload))
  const digest = hmac.digest('hex')
  return digest === signature
}
