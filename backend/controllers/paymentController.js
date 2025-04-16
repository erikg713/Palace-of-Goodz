import axios from 'axios';

const PI_API_KEY = process.env.PI_API_KEY;

export const approvePayment = async (req, res) => {
  const { paymentId } = req.body;
  try {
    await axios.post(
      'https://api.minepi.com/payments/approve',
      { paymentId },
      {
        headers: {
          Authorization: `Key ${PI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Approval failed:", err.response?.data || err.message);
    return res.status(500).json({ error: "Approval failed" });
  }
};

export const completePayment = async (req, res) => {
  const { paymentId, txid } = req.body;
  try {
    await axios.post(
      'https://api.minepi.com/payments/complete',
      { paymentId, txid },
      {
        headers: {
          Authorization: `Key ${PI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    // Optional: store transaction in the database here
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Completion failed:", err.response?.data || err.message);
    return res.status(500).json({ error: "Completion failed" });
  }
};
