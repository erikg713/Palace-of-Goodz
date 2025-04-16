export const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Admins only' })
  }
  next()
}
export const adminOnly = (req, res, next) => {
  const ADMIN_UIDS = ['pi_admin_uid_1', 'pi_admin_uid_2'];
  if (!ADMIN_UIDS.includes(req.user.uid)) {
    return res.status(403).json({ error: 'Admins only' });
  }
  next();
};
