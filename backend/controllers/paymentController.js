import Payment from '../models/Payment.js';
import axios from 'axios';

export const verifyPayment = async (req, res) => {
  try {
    const { paymentId } = req.body;

    // Fetch payment data from Pi Network API
    const response = await axios.get(`https://api.minepi.com/v2/payments/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${process.env.PI_API_KEY}`,
      },
    });

    const paymentData = response.data;
    const { transaction } = paymentData;

    if (transaction && transaction.txid) {
      // Update payment status to completed and store txid
      await Payment.findOneAndUpdate(
        { paymentId },
        {
          status: 'completed',
          txid: transaction.txid,
        },
        { new: true }
      );
      return res.json({ message: 'Payment verified & completed.' });
    } else {
      return res.status(400).json({ message: 'Payment not yet completed.' });
    }
  } catch (err) {
    console.error('verifyPayment error:', err);
    res.status(500).json({ message: 'Payment verification failed.' });
  }
};
