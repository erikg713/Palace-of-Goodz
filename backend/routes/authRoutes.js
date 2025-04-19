import { Router } from 'express';
import { piLoginController } from '../controllers/piAuthController.js';

const router = Router();

// Pi Network login route
router.post('/pi-login', piLoginController);

export default router;
