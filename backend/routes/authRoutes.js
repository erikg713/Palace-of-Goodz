import express from 'express';
import { piLoginController } from '../controllers/piAuthController.js';

const router = express.Router();

// POST /api/auth/pi-login
router.post('/pi-login', piLoginController);

export default router;import express from 'express';
import { piLoginController } from '../controllers/piAuthController.js';

const router = express.Router();

// POST /api/auth/pi-login
router.post('/pi-login', piLoginController);

export default router;
