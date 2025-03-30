import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validateMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { Logger } from '../utils/logger'; // Assuming you have a logger utility

export const validateMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    Logger.error('Validation failed', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

/**
 * Middleware to validate request data using express-validator.
 * If validation fails, it responds with a 400 status and the validation errors.
 * Otherwise, it allows the request to proceed to the next middleware or route handler.
 *
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const validateMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
