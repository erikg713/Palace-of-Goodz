import axios from 'axios'

export const verifyUser = async (accessToken) => {
  try {
    const { data } = await axios.get('https://api.minepi.com/me', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    return data;
  } catch {
    return null;
  }
}
