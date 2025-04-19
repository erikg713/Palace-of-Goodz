import axios from 'axios';

export const verifyPiAuth = async (user, accessToken) => {
  try {
    const response = await axios.get(`https://api.minepi.com/v2/me`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    return response.data.uid === user.uid;
  } catch (err) {
    console.error('[verifyPiAuth]', err);
    return false;
  }
};
