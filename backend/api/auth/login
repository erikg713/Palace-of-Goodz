import express from 'express';
const router = express.Router();

router.post('/login', async (req, res) => {
  const { uid, username } = req.body;

  if (!uid || !username) {
    return res.status(400).json({ error: 'Missing Pi credentials' });
  }

  // Store or update the user in your DB
  const role = (uid === 'your_admin_uid') ? 'admin' : 'customer'; // Example

  res.set({
    'x-user-id': uid,
    'x-user-username': username,
    'x-user-role': role,
  });

  res.json({ message: 'Login successful', uid, username, role });
});

export default router;
