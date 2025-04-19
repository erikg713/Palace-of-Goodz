import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  roles: { type: [String], default: ['user'] },
  joined: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);
export default User;
