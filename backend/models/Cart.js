const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // assumes you have a Product model
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
  price_in_pi: {
    type: Number,
    required: true, // snapshot of product price when added
  },
});

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // assumes you have a User model
      required: true,
      unique: true, // one cart per user
    },
    items: [CartItemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
