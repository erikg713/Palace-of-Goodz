const express = require('express');
const router = express.Router();
const verifyPiToken = require('../middlewares/piAuth');

router.get('/me', verifyPiToken, (req, res) => {
  const user = req.piUser;
  res.json({ message: `Welcome back, ${user.username}`, uid: user.uid });
});

module.exports = router;
