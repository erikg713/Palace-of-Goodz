import express from 'express';
import { getProfile } from '../controllers/authController.js';
import { piAuthMiddleware } from '../middleware/piAuthMiddleware.js';

const router = express.Router();

router.get('/me', piAuthMiddleware, getProfile);

export default router;
