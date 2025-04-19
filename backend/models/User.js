import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  role: { type: String, default: 'user' },
  joined: { type: Date, default: Date.now },
})

export default mongoose.model('User', userSchema)
