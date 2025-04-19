export const requirePiAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const piUser = await axios.get('https://api.minepi.com/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    req.piUser = piUser.data;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid Pi token' });
  }
};
