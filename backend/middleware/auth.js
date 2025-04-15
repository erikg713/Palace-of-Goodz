import { verifyUser } from '../utils/verifyUser.js'

// Admin Pi usernames
const ADMIN_USERNAMES = ['your_pi_username']

export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'No token' })

  const user = await verifyUser(token)
  if (!user) return res.status(403).json({ error: 'Invalid user' })

  // Inject admin role based on username
  if (ADMIN_USERNAMES.includes(user.username)) {
    user.roles = ['admin']
  } else {
    user.roles = ['user']
  }

  req.user = user
  next()
}
