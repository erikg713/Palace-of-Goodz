import { Request, Response } from 'express';
import Cart from '../models/Cart'; // Ensure you have a Cart model defined

// Retrieve the user's cart
export const getCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        if (!userId) {
            res.status(400).json({ error: 'User ID is required.' });
            return;
        }

        const cart = await Cart.findOne({ user: userId }).populate('items.product');
        res.status(200).json(cart);
    } catch (err: any) {
        res.status(500).json({ error: 'Failed to retrieve cart.', details: err.message });
    }
};

// Add an item to the cart
export const addToCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, productId, quantity } = req.body;
        if (!userId || !productId || !quantity) {
            res.status(400).json({ error: 'Missing required fields: userId, productId, and quantity.' });
            return;
        }

        // Retrieve or create the user's cart
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        // Update quantity if product exists, otherwise add new item
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();
        res.status(200).json({ message: 'Item added to cart.', cart });
    } catch (err: any) {
        res.status(500).json({ error: 'Failed to add item to cart.', details: err.message });
    }
};

// Remove an item from the cart
export const removeFromCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, productId } = req.body;
        if (!userId || !productId) {
            res.status(400).json({ error: 'Missing required fields: userId and productId.' });
            return;
        }

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            res.status(404).json({ error: 'Cart not found.' });
            return;
        }

        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        await cart.save();
        res.status(200).json({ message: 'Item removed from cart.', cart });
    } catch (err: any) {
        res.status(500).json({ error: 'Failed to remove item from cart.', details: err.message });
    }
};

// Clear all items from the cart
export const clearCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.body;
        if (!userId) {
            res.status(400).json({ error: 'User ID is required.' });
            return;
        }

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            res.status(404).json({ error: 'Cart not found.' });
            return;
        }

        cart.items = [];
        await cart.save();
        res.status(200).json({ message: 'Cart cleared.', cart });
    } catch (err: any) {
        res.status(500).json({ error: 'Failed to clear cart.', details: err.message });
    }
};
