import express from 'express';
import { createOrder, getOrder, updateOrder, deleteOrder } from '../controllers/orderController';
import { validateOrder } from '../utils/validators';
import { authMiddleware, errorHandler } from '../middleware';

const router = express.Router();

// Route to create a new order
router.post('/', authMiddleware, validateOrder, async (req, res, next) => {
  try {
    await createOrder(req, res);
  } catch (error) {
    next(error);
  }
});

// Route to get an order by ID
router.get('/:id', authMiddleware, async (req, res, next) => {
  try {
    await getOrder(req, res);
  } catch (error) {
    next(error);
  }
});

// Route to update an order by ID
router.put('/:id', authMiddleware, validateOrder, async (req, res, next) => {
  try {
    await updateOrder(req, res);
  } catch (error) {
    next(error);
  }
});

// Route to delete an order by ID
router.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    await deleteOrder(req, res);
  } catch (error) {
    next(error);
  }
});

// Error handling middleware
router.use(errorHandler);

export default router;
