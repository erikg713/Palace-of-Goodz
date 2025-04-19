// routes/authRoutes.js
import express from 'express';
import { handlePiLogin } from '../controllers/authController.js';

const router = express.Router();
router.post('/pi-login', handlePiLogin);
export default router;
