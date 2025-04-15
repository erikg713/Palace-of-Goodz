import { Request, Response, NextFunction } from 'express';

// HTTP Status Codes as Constants
const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// Custom error class
class AppError extends Error {
  public statusCode: number;
  public status: string;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Global error handling middleware
const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  err.status = err.status || 'error';

  // Conditional response based on environment
  const isDevelopment = process.env.NODE_ENV === 'development';
  const errorResponse = {
    status: err.status,
    message: err.message,
    ...(isDevelopment && { stack: err.stack }), // Show stack trace only in development
  };

  // Log the error
  console.error('ERROR 💥:', err);

  // Send response
  res.status(err.statusCode).json(errorResponse);
};

// Async wrapper for routes
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch(next);
};

// Not found handler
const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const err = new AppError(
    `Cannot find ${req.originalUrl} on this server!`,
    HTTP_STATUS.NOT_FOUND
  );
  next(err);
};

export { AppError, globalErrorHandler, notFoundHandler, asyncHandler };
