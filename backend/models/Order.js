import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number, default: 1 }
  }],
  total_pi: { type: Number, required: true },
  paymentId: { type: String, required: true },
  status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
