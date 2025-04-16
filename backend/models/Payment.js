const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  paymentId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  txid: {
    type: String,
    default: null
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['initiated', 'approved', 'completed', 'failed'],
    default: 'initiated'
  },
  memo: {
    type: String
  },
  metadata: {
    type: Object, // includes user info, product ID, etc.
    default: {}
  },
  error: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

paymentSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Payment', paymentSchema);
