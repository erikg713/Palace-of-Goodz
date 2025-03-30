import { Request, Response, NextFunction } from "express";

// Custom error class
class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorMiddleware = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  // Determine the environment
  const isProduction = process.env.NODE_ENV === 'production';

  // Log the error stack trace in non-production environments
  if (!isProduction) {
    console.error(err.stack);
  }

  // Set the status code
  const statusCode = err.statusCode || 500;

  // Send the error response
  res.status(statusCode).json({
    error: isProduction ? 'Internal Server Error' : err.message,
    ...(isProduction ? {} : { stack: err.stack }), // Include stack trace in non-production environments
  });
};

// Example of throwing a custom error
// throw new AppError('Something went wrong!', 400);
