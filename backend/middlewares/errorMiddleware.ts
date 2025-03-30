import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // Log the error stack for debugging
  console.error(err.stack);

  // Determine the status code based on the error type
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Create an error response object
  const errorResponse = {
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }), // Include stack trace only in development mode
    ...(statusCode === 500 && { error: 'Internal Server Error' }), // Generic message for server errors
  };

  res.status(statusCode).json(errorResponse);
};
