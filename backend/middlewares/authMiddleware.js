export const authMiddleware = (req, res, next) => {
  const uid = req.headers['x-user-id']
  const role = req.headers['x-user-role'] // e.g. "admin" or "customer"

  if (!uid || !role) {
    return res.status(401).json({ error: 'Unauthorized: Missing user credentials' })
  }

  req.user = { uid, role }
  next()
}
