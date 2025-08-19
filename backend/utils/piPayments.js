import axios from "axios";
import { PI_BASE_URL, PI_API_KEY } from "../config/pi.js";

export async function createPayment(amount, memo, uid) {
  const response = await axios.post(
    `${PI_BASE_URL}/payments`,
    { amount, memo, metadata: { uid } },
    { headers: { Authorization: `Key ${PI_API_KEY}` } }
  );
  return response.data;
}

export async function verifyPayment(paymentId) {
  const response = await axios.get(
    `${PI_BASE_URL}/payments/${paymentId}`,
    { headers: { Authorization: `Key ${PI_API_KEY}` } }
  );
  return response.data;
}
