import { verifyUser } from '../utils/verifyUser.js'

export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'No token provided' })

  const user = await verifyUser(token)
  if (!user) return res.status(403).json({ error: 'Invalid Pi user' })

  req.user = user
  next()
}
