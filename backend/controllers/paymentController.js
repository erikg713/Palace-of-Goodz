import Payment from '../models/Payment.js';

export const createPayment = async (req, res) => {
  try {
    const { paymentId, uid, amount, memo, metadata } = req.body;

    const newPayment = new Payment({ paymentId, uid, amount, memo, metadata, status: 'PENDING' });
    await newPayment.save();

    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Payment creation error' });
  }
};

export const completePayment = async (req, res) => {
  try {
    const { paymentId, txid } = req.body;

    const payment = await Payment.findOne({ paymentId });
    if (!payment) return res.status(404).json({ message: 'Payment not found' });

    payment.txid = txid;
    payment.status = 'COMPLETED';
    await payment.save();

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Payment completion error' });
  }
};

export const getPaymentStatus = async (req, res) => {
  try {
    const payment = await Payment.findOne({ paymentId: req.params.paymentId });
    if (!payment) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(payment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving payment status' });
  }
};
