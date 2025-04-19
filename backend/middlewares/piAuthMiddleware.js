export const piAuthMiddleware = (req, res, next) => {
  const uid = req.headers['x-user-id'];
  const username = req.headers['x-user-username'];
  const role = req.headers['x-user-role'];
const axios = require('axios');

async function verifyPiToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No auth token' });

    const token = authHeader.split(' ')[1];

    // Validate with Pi's server
    const response = await axios.get('https://api.minepi.com/user/me', {
      headers: { Authorization: `Bearer ${token}` }
    });

    req.piUser = response.data; // user.uid, username, etc.
    next();
  } catch (err) {
    console.error('Pi token verification failed:', err.message);
    res.status(403).json({ message: 'Invalid Pi token' });
  }
}

module.exports = verifyPiToken;
  if (!uid || !username) {
    return res.status(401).json({ error: 'Unauthorized: Missing Pi credentials' });
  }

  req.user = { uid, username, role: role || 'customer' };
  next();
};
