import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  uid: { type: String, required: true },
  roles: { type: [String], default: [] },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
