import express from "express";
import mongoose from "mongoose";
import { authMiddleware } from "../middlewares/authMiddleware";
import Order from "../models/Order";
import Product from "../models/Product";
import piPayment from "../services/piPayment";
import { createOrder, getOrderById, getUserOrders, updateOrderStatus } from "../controllers/orderController";

const router = express.Router();

// Standard Order Routes
router.post("/", authMiddleware, createOrder);
router.get("/:id", authMiddleware, getOrderById);
router.get("/", authMiddleware, getUserOrders);
router.put("/:id/status", authMiddleware, updateOrderStatus);

// ✅ Pi Payment Order Completion
router.post("/complete", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { paymentId, txid } = req.body;
    const userId = req.user.userId;

    // 1️⃣ Verify payment with Pi Network
    const payment = await piPayment.getPayment(paymentId);
    if (payment.status !== "approved") {
      throw new Error("Payment not approved");
    }

    // 2️⃣ Retrieve product from metadata
    const product = await Product.findById(payment.metadata.productId).session(session);
    if (!product || product.quantity < 1) {
      throw new Error("Product unavailable");
    }

    // 3️⃣ Update product stock
    product.quantity -= 1;
    await product.save({ session });

    // 4️⃣ Create an order
    const order = new Order({
      piPaymentId: paymentId,
      product: product._id,
      buyer: userId,
      status: "completed",
      piTransactionId: txid,
    });

    await order.save({ session });

    // 5️⃣ Finalize payment with Pi Network
    await piPayment.completePayment(paymentId);

    await session.commitTransaction();
    res.status(201).json(order);
  } catch (error) {
    await session.abortTransaction();
    console.error(error);
    res.status(400).json({ error: error.message });
  } finally {
    session.endSession();
  }
});

export default router;
