import rateLimit from "express-rate-limit";
import { Request, Response, NextFunction } from "express";
import fs from 'fs';
import path from 'path';

// Dynamic configuration
const WINDOW_MINUTES = process.env.RATE_LIMIT_WINDOW_MINUTES || 15;
const MAX_REQUESTS = process.env.RATE_LIMIT_MAX_REQUESTS || 100;

// Whitelist certain IPs
const WHITELIST = process.env.RATE_LIMIT_WHITELIST ? process.env.RATE_LIMIT_WHITELIST.split(",") : [];

const rateLimitingMiddleware = rateLimit({
  windowMs: WINDOW_MINUTES * 60 * 1000, // windowMs is now dynamic
  max: MAX_REQUESTS, // max is now dynamic
  message: "Too many requests from this IP, please try again later.",
  handler: (req: Request, res: Response, next: NextFunction) => {
    if (WHITELIST.includes(req.ip)) {
      return next();
    }
    res.status(429).json({
      message: "Too many requests from this IP, please try again later.",
    });
  },
  onLimitReached: (req: Request, res: Response, options: any) => {
    const logMessage = `Rate limit exceeded: ${req.ip} at ${new Date().toISOString()}\n`;
    fs.appendFileSync(path.join(__dirname, 'rate-limit.log'), logMessage);
  },
});

export default rateLimitingMiddleware;
