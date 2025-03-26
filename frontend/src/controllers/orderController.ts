import { Request, Response } from "express";
import mongoose from "mongoose";
import Order from "../models/Order";
import Product from "../models/Product";
import piPayment from "../services/piPayment";

/**
 * Create a new order
 */
export const createOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { productId } = req.body;
    const userId = req.user?.userId;

    // Validate product
    const product = await Product.findById(productId);
    if (!product || product.quantity < 1) {
      return res.status(400).json({ error: "Product is out of stock" });
    }

    // Create order
    const order = new Order({
      product: productId,
      buyer: userId,
      status: "pending",
    });

    await order.save();

    return res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Get order by ID
 */
export const getOrderById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const order = await Order.findById(req.params.id).populate("product buyer");

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Get orders for a specific user
 */
export const getUserOrders = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.user?.userId;
    const orders = await Order.find({ buyer: userId }).populate("product");

    return res.json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Update order status (Admin Only)
 */
export const updateOrderStatus = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.status = status;
    await order.save();

    return res.json(order);
  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Complete order using Pi Payment
 */
export const completePiOrder = async (req: Request, res: Response): Promise<Response> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { paymentId, txid } = req.body;
    const userId = req.user?.userId;

    // 1️⃣ Verify payment with Pi Network
    const payment = await piPayment.getPayment(paymentId);
    if (payment.status !== "approved") {
      throw new Error("Payment not approved");
    }

    // 2️⃣ Get product from metadata
    const product = await Product.findById(payment.metadata.productId).session(session);
    if (!product || product.quantity < 1) {
      throw new Error("Product unavailable");
    }

    // 3️⃣ Reduce product stock
    product.quantity -= 1;
    await product.save({ session });

    // 4️⃣ Create order
    const order = new Order({
      piPaymentId: paymentId,
      product: product._id,
      buyer: userId,
      status: "completed",
      piTransactionId: txid,
    });

    await order.save({ session });

    // 5️⃣ Finalize Pi Network payment
    await piPayment.completePayment(paymentId);

    await session.commitTransaction();
    return res.status(201).json(order);
  } catch (error) {
    await session.abortTransaction();
    console.error("Pi payment error:", error);
    return res.status(400).json({ error: error.message });
  } finally {
    session.endSession();
  }
};
