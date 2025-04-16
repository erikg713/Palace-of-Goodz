export const piAuthMiddleware = (req, res, next) => {
  const uid = req.headers['x-user-id'];
  const username = req.headers['x-user-username'];
  const role = req.headers['x-user-role'];

  if (!uid || !username) {
    return res.status(401).json({ error: 'Unauthorized: Missing Pi credentials' });
  }

  req.user = { uid, username, role: role || 'customer' };
  next();
};
export const piAuthMiddleware = (req, res, next) => {
  const uid = req.headers['x-user-id'];
  const username = req.headers['x-user-username'];
  const role = req.headers['x-user-role'];

  if (!uid || !username) {
    return res.status(401).json({ error: 'Unauthorized: Missing Pi credentials' });
  }

  req.user = { uid, username, role: role || 'customer' };
  next();
};
