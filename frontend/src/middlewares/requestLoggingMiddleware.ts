import { Request, Response, NextFunction } from "express";
import winston from "winston";

// Create a logger
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'warn' : 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console(),
    // Add file transport for production
    ...(process.env.NODE_ENV === 'production' ? [new winston.transports.File({ filename: 'requests.log' })] : [])
  ]
});

// Request logging middleware
export const requestLoggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on('finish', () => {
    const { method, url, headers, query, body } = req;
    const { statusCode, statusMessage } = res;
    const duration = Date.now() - start;
    logger.info(`${method} ${url} - Status: ${statusCode} ${statusMessage} - Duration: ${duration}ms - Headers: ${JSON.stringify(headers)} - Query: ${JSON.stringify(query)} - Body: ${JSON.stringify(body)} - IP: ${req.ip}`);
  });
  next();
};
