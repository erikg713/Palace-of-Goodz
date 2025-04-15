import axios from 'axios'

export const verifyUser = async (accessToken) => {
  try {
    const res = await axios.get('https://api.minepi.com/me', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    return res.data
  } catch {
    return null
  }
}
