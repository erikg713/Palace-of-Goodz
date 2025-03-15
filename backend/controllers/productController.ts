import { Request, Response } from 'express';
import Cart from '../models/Cart';

export const addToCart = async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) {
      cart = new Cart({ userId: req.user.userId, products: [{ productId, quantity }] });
    } else {
      const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
      if (productIndex !== -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
    }
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add to cart' });
  }
};

export const getCart = async (req: Request, res: Response) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.userId }).populate('products.productId');
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

export const updateCartItem = async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
    if (productIndex !== -1) {
      cart.products[productIndex].quantity = quantity;
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ error: 'Product not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update cart' });
  }
};
