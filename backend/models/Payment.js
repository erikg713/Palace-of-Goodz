import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  paymentId: { type: String, required: true, unique: true },
  uid: { type: String, required: true },
  amount: { type: Number, required: true },
  memo: { type: String },
  metadata: { type: Object },
  status: { type: String, enum: ['PENDING', 'COMPLETED', 'CANCELLED'], default: 'PENDING' },
  txid: { type: String },
}, { timestamps: true });

export default mongoose.model('Payment', paymentSchema);
