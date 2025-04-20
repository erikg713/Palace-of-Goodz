import mongoose from 'mongoose';

const errorLogSchema = new mongoose.Schema({
  message: String,
  stack: String,
  statusCode: Number,
  url: String,
  method: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('ErrorLog', errorLogSchema);
