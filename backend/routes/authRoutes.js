import { Router } from 'express';
import {
  piLoginController,
  verifyPiUserController,
} from '../controllers/piAuthController.js';

const router = Router();

// POST /api/auth/pi-login
router.post('/pi-login', piLoginController);

// POST /api/auth/verify
router.post('/verify', verifyPiUserController);

export default router;
