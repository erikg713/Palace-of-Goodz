import { Request, Response, NextFunction } from 'express';

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  next();
};
const timestamp = new Date().toISOString();
console.log(`[${timestamp}] ${req.method} ${req.url}`);
console.log(`[${timestamp}] ${req.method} ${req.url} - Headers: ${JSON.stringify(req.headers)}`);
console.log(`[${timestamp}] ${req.method} ${req.url} - Headers: ${JSON.stringify(req.headers)}`);
import { createLogger, transports, format } from 'winston';

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console(),
  ],
});

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.url}`, { headers: req.headers, body: req.body });
  next();
};
try {
  logger.info(`${req.method} ${req.url}`, { headers: req.headers, body: req.body });
} catch (error) {
  console.error('Logging error:', error);
}
next();
try {
  logger.info(`${req.method} ${req.url}`, { he
    const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'warn' : 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console(),
  ],
});aders: req.headers, body: req.body });
} catch (error) {
  console.error('Logging error:', error);
}
next();
