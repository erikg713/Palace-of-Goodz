const ADMIN_UIDS = process.env.ADMIN_UIDS?.split(',') || []

export function verifyAdmin(req, res, next) {
  const uid = req.headers['x-admin-uid']
  if (!uid || !ADMIN_UIDS.includes(uid)) {
    return res.status(403).json({ error: 'Admin access denied' })
  }
  next()
}
