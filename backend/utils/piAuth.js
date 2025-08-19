import axios from "axios";
import { PI_BASE_URL, PI_API_KEY } from "../config/pi.js";

export async function verifyPiAuth(pi_signed_message) {
  const response = await axios.post(
    `${PI_BASE_URL}/verify`,
    { pi_signed_message },
    { headers: { Authorization: `Key ${PI_API_KEY}` } }
  );

  if (!response.data || !response.data.username) {
    throw new Error("Invalid Pi authentication");
  }

  return response.data; // { username, uid, roles }
}
