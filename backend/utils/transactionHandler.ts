import mongoose from 'mongoose';
import PiPaymentService from '../services/piPaymentService';
import Product from '../models/Product';
import Order from '../models/Order';

export const processPiTransaction = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Step 1: Fetch Product Details
    const product = await Product.findById(req.body.productId).session(session);
    if (!product) throw new Error('Product not found');

    // Step 2: Deduct Product Quantity
    product.quantity -= 1;
    await product.save({ session });

    // Step 3: Create Order
    const order = new Order({
      paymentId: req.body.paymentId,
      productId: product._id,
      buyer
