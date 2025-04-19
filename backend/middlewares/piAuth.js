const axios = require('axios');

const verifyPiToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Missing token' });

    const response = await axios.get('https://api.minepi.com/user/me', {
      headers: { Authorization: `Bearer ${token}` }
    });

    req.piUser = response.data; // Includes `uid`, `username`
    next();
  } catch (error) {
    console.error('Pi auth failed:', error.message);
    return res.status(403).json({ message: 'Invalid Pi token' });
  }
};
const PiUser = require('../models/PiUser');

...

const { uid, username } = response.data;
let user = await PiUser.findOne({ uid });
if (!user) {
  user = await PiUser.create({ uid, username, roles: ['user'] });
}
req.piUser = user;

module.exports = verifyPiToken;
