import express from 'express';
import { getUser, updateUser, deleteUser, getAllUsers } from '../controllers/userController';
import { validateUserUpdate } from '../utils/validators';

const router = express.Router();

// Route to get a user by ID
router.get('/:id', getUser);

// Route to update a user by ID
router.put('/:id', validateUserUpdate, updateUser);

// Route to delete a user by ID
router.delete('/:id', deleteUser);

// Route to get all users
router.get('/', getAllUsers);

export default router;
