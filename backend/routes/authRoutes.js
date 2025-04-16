import express from 'express';
import { registerUser } from '../controllers/authController.js';
import { registerValidation } from '../validators/authValidators.js';
import { validationResult } from 'express-validator';

const router = express.Router();

router.post('/register', registerValidation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  registerUser(req, res, next);
});

export default router;
