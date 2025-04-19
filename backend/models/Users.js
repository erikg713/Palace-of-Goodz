import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true }, // Pi Network UID
    username: { type: String, required: true },
    roles: { type: [String], default: ['user'] }, // Can include 'admin'
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
