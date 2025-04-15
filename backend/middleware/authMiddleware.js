export const authMiddleware = (req, res, next) => {
  const uid = req.headers['x-user-id']
  if (!uid) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  req.user = { uid } // attach user object for downstream use
  next()
}
