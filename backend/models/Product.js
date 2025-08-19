import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price_in_pi: { type: Number, required: true },
  description: { type: String },
  image_url: { type: String }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
