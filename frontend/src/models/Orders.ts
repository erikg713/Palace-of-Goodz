import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
  piPaymentId?: string;
  piTransactionId?: string;
  product: mongoose.Types.ObjectId;
  buyer: mongoose.Types.ObjectId;
  status: "pending" | "completed" | "canceled";
  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    piPaymentId: { type: String, required: false },
    piTransactionId: { type: String, required: false },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["pending", "completed", "canceled"], default: "pending" },
  },
  { timestamps: true }
);

const Order = mongoose.model<IOrder>("Order", OrderSchema);
export default Order;
