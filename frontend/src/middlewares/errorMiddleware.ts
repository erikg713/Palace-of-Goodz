import { Request, Response, NextFunction } from "express";
import winston from "winston";
import dotenv from "dotenv";

dotenv.config();

// Initialize Winston logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
});

// Custom error class with additional fields for better error handling
class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  constructor(message: string, statusCode: number, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Middleware to handle errors
export const errorMiddleware = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  const isProduction = process.env.NODE_ENV === 'production';

  // Log error details in non-production environments
  if (!isProduction) {
    logger.error(`Error: ${err.message}\nStack: ${err.stack}\nRequest URL: ${req.url}\nRequest Method: ${req.method}\nRequest Body: ${JSON.stringify(req.body)}`);
  }

  // Determine the status code and message
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'Internal Server Error';

  // Send the error response
  res.status(statusCode).json({
    error: message,
    ...(isProduction ? {} : { stack: err.stack, request: { url: req.url, method: req.method, body: req.body } }), // Include stack trace and request details in non-production environments
  });
};

// Utility function to create new operational errors
export const createError = (message: string, statusCode: number): AppError => {
  return new AppError(message, statusCode, true);
};

// Example of throwing a custom operational error
// throw createError('Resource not found', 404);
