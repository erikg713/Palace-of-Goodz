// utils/piVerification.js
import fetch from 'node-fetch';

export async function verifyPiAuth(user, accessToken) {
  try {
    const response = await fetch('https://api.minepi.com/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = await response.json();
    return data.uid === user.uid; // Must match exactly
  } catch (err) {
    console.error('Pi verification failed:', err);
    return false;
  }
}
