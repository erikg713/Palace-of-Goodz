import { Request, Response, NextFunction } from 'express';

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
const globalErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

// Not found handler
const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const err = new AppError(`Cannot find ${req.originalUrl} on this server!`, 404);
  next(err);
};

export { AppError, globalErrorHandler, notFoundHandler };
