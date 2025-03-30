import { Request, Response, NextFunction } from 'express';
import { createLogger, transports, format } from 'winston';

// Create a winston logger instance
const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'warn' : 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console(),
  ],
});

// Middleware function to log requests
export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Log request method, URL, and headers
    logger.info(`${req.method} ${req.url}`, {
      headers: req.headers,
      body: req.body // Be cautious with logging the body as it may contain sensitive information
    });
  } catch (error) {
    logger.error('Logging error:', error);
  }

  next();
};
