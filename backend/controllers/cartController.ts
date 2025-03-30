import { Request, Response } from 'express';
import Cart from '../models/Cart';
import { check, validationResult } from 'express-validator';

// Helper function to find cart by user ID
const findCartByUserId = async (userId: string) => {
    return await Cart.findOne({ user: userId }).populate('items.product');
};

// Retrieve the user's cart
export const getCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        if (!userId) {
            res.status(400).json({ error: 'User ID is required.' });
            return;
        }

        const cart = await findCartByUserId(userId);
        if (!cart) {
            res.status(404).json({ error: 'Cart not found.' });
            return;
        }

        res.status(200).json(cart);
    } catch (err: any) {
        res.status(500).json({ error: 'Failed to retrieve cart.', details: err.message });
    }
};

// Add an item to the cart
export const addToCart = [
    check('userId').notEmpty().withMessage('User ID is required.'),
    check('productId').notEmpty().withMessage('Product ID is required.'),
    check('quantity').isInt({ gt: 0 }).withMessage('Quantity must be a positive integer.'),
    async (req: Request, res: Response): Promise<void> => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        try {
            const { userId, productId, quantity } = req.body;

            let cart = await findCartByUserId(userId);
            if (!cart) {
                cart = new Cart({ user: userId, items: [] });
            }

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
    }
];

// Remove an item from the cart
export const removeFromCart = [
    check('userId').notEmpty().withMessage('User ID is required.'),
    check('productId').notEmpty().withMessage('Product ID is required.'),
    async (req: Request, res: Response): Promise<void> => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        try {
            const { userId, productId } = req.body;

            const cart = await findCartByUserId(userId);
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
    }
];

// Clear all items from the cart
export const clearCart = [
    check('userId').notEmpty().withMessage('User ID is required.'),
    async (req: Request, res: Response): Promise<void> => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        try {
            const { userId } = req.body;

            const cart = await findCartByUserId(userId);
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
    }
];
