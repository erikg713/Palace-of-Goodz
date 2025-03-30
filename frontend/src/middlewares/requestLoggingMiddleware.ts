import { Request, Response, NextFunction } from "express";
import winston from "winston";

// Create a logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console(),
    // Additional transports like File can be added here
  ]
});

// Request logging middleware
export const requestLoggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { method, url, headers, query, body } = req;
  logger.info(`${method} ${url} - Headers: ${JSON.stringify(headers)} - Query: ${JSON.stringify(query)} - Body: ${JSON.stringify(body)}`);
  next();
};
