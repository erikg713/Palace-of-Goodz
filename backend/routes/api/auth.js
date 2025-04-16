// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../../models/User'); // Update path to your User model
const jwt = require('jsonwebtoken');

router.post('/pi-login', async (req, res) => {
  const { user, accessToken } = req.body;

  try {
    const existingUser = await User.findOneAndUpdate(
      { piUsername: user.username },
      { $setOnInsert: { piUsername: user.username, roles: ['user'] } },
      { upsert: true, new: true }
    );

    const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET);
    res.json({ token, user: existingUser });
  } catch (err) {
    res.status(500).json({ error: 'Pi login failed' });
  }
});

module.exports = router;
