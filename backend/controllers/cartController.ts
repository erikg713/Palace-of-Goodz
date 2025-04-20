import { Request, Response, NextFunction } from 'express'; import mongoose from 'mongoose'; import { body, validationResult } from 'express-validator'; import Cart, { ICart } from '../models/Cart'; import logger from '../utils/logger';

// --- Validation Middleware --- export const validateCartAction = (action: 'get' | 'add' | 'remove' | 'clear') => { switch (action) { case 'get': return [ body('userId').notEmpty().withMessage('User ID is required.'), ]; case 'add': return [ body('userId').notEmpty().withMessage('User ID is required.'), body('productId').notEmpty().withMessage('Product ID is required.'), body('quantity').isInt({ gt: 0 }).withMessage('Quantity must be > 0'), ]; case 'remove': return [ body('userId').notEmpty().withMessage('User ID is required.'), body('productId').notEmpty().withMessage('Product ID is required.'), ]; case 'clear': return [ body('userId').notEmpty().withMessage('User ID is required.'), ]; } };

// --- Service Layer --- class CartService { static async findCartOrCreate(userId: string, session?: mongoose.ClientSession): Promise<ICart> { let cart = await Cart.findOne({ user: userId }).session(session || null).populate('items.product'); if (!cart) { cart = new Cart({ user: userId, items: [] }); } return cart; }

static async getCart(userId: string): Promise<ICart> { return this.findCartOrCreate(userId); }

static async addItem(userId: string, productId: string, qty: number): Promise<ICart> { const session = await mongoose.startSession(); try { await session.withTransaction(async () => { const cart = await this.findCartOrCreate(userId, session); const idx = cart.items.findIndex(i => i.product.toString() === productId); if (idx > -1) { cart.items[idx].quantity += qty; } else { cart.items.push({ product: productId, quantity: qty }); } await cart.save({ session }); }); return await this.getCart(userId); } finally { session.endSession(); } }

static async removeItem(userId: string, productId: string): Promise<ICart> { const session = await mongoose.startSession(); try { await session.withTransaction(async () => { const cart = await this.findCartOrCreate(userId, session); cart.items = cart.items.filter(i => i.product.toString() !== productId); await cart.save({ session }); }); return await this.getCart(userId); } finally { session.endSession(); } }

static async clearCart(userId: string): Promise<ICart> { const session = await mongoose.startSession(); try { await session.withTransaction(async () => { const cart = await this.findCartOrCreate(userId, session); cart.items = []; await cart.save({ session }); }); return await this.getCart(userId); } finally { session.endSession(); } } }

// --- Controller Layer --- export const CartController = { getCart: async (req: Request, res: Response, next: NextFunction) => { try { const { userId } = req.params; const errors = validationResult(req); if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

const cart = await CartService.getCart(userId);
  res.json(cart);
} catch (err: any) {
  logger.error('getCart failed', { error: err });
  next(err);
}

},

addToCart: async (req: Request, res: Response, next: NextFunction) => { try { const errors = validationResult(req); if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

const { userId, productId, quantity } = req.body;
  const cart = await CartService.addItem(userId, productId, quantity);
  res.json({ message: 'Item added', cart });
} catch (err: any) {
  logger.error('addToCart failed', { error: err });
  next(err);
}

},

removeFromCart: async (req: Request, res: Response, next: NextFunction) => { try { const errors = validationResult(req); if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

const { userId, productId } = req.body;
  const cart = await CartService.removeItem(userId, productId);
  res.json({ message: 'Item removed', cart });
} catch (err: any) {
  logger.error('removeFromCart failed', { error: err });
  next(err);
}

},

clearCart: async (req: Request, res: Response, next: NextFunction) => { try { const errors = validationResult(req); if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

const { userId } = req.body;
  const cart = await CartService.clearCart(userId);
  res.json({ message: 'Cart cleared', cart });
} catch (err: any) {
  logger.error('clearCart failed', { error: err });
  next(err);
}

} };

