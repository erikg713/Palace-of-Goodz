/**
 * Rate limiting middleware to prevent brute force attacks
 */
import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 login attempts per windowMs
  message: "Too many login attempts, please try again after 15 minutes",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  skip: (req, res) => {
    // Skip rate limiting for health checks or other endpoints
    return req.path === "/health";
  }
});

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per windowMs
  message: "Too many requests from this IP, please try again later",
  standardHeaders: true,
  legacyHeaders: false
});

export const strictLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10, // 10 requests per windowMs
  message: "Too many requests, please slow down",
  standardHeaders: true,
  legacyHeaders: false
});
