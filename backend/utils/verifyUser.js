import axios from 'axios'

export const verifyUser = async (accessToken) => {
  try {
    const response = await axios.get('https://api.minepi.com/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    return response.data
  } catch {
    return null
  }
}
