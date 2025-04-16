export const piAuthMiddleware = (req, res, next) => {
  const uid = req.headers['x-user-id'];
  const username = req.headers['x-user-username'];
  const role = req.headers['x-user-role']; // Internal: based on UID

  if (!uid || !username) {
    return res.status(401).json({ error: 'Unauthorized: Missing Pi credentials' });
  }

  // You may optionally verify the UID against your DB here
  req.user = { uid, username, role: role || 'customer' };

  next();
};
