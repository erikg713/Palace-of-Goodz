import axios from 'axios';

export const verifyUser = async (accessToken) => {
  if (!accessToken) {
    console.error('Access token is required for verification.');
    return null;
  }

  try {
    const { data } = await axios.get('https://api.minepi.com/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data;
  } catch (error) {
    console.error('Failed to verify user:', error.response?.data || error.message);
    return null;
  }
};
