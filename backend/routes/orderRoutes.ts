import express from 'express';
import { createOrder, getOrder, updateOrder, deleteOrder } from '../controllers/orderController';
import { validateOrder } from '../utils/validators';

const router = express.Router();

// Route to create a new order
router.post('/', validateOrder, createOrder);

// Route to get an order by ID
router.get('/:id', getOrder);

// Route to update an order by ID
router.put('/:id', validateOrder, updateOrder);

// Route to delete an order by ID
router.delete('/:id', deleteOrder);

export default router;
