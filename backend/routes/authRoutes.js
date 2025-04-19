import express from 'express';
import { verifyPiUser } from '../controllers/authController.js';
const router = express.Router();

router.post('/pi-login', verifyPiUser);

export default router;
