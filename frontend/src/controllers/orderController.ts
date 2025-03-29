import { Request, Response, NextFunction } from "express";
import Order from "../models/Order";
import Product from "../models/Product";
import piPayment from "../services/piPayment";
import { validateCreateOrder } from "../validators/orderValidators";

/**
 * Create a new order
 */
export const createOrder = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    // Validate request
    const { error } = validateCreateOrder(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

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
    console.error("Error creating order:", error); // Log the error
    next(error); // Pass error to centralized error handler
  }
};

// Other functions below...
