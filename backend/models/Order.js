import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  items: [
    {
      productId: mongoose.Schema.Types.ObjectId,
      quantity: Number,
    }
  ],
  total: Number,
  paymentId: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Order', orderSchema);
