import compression from "compression";

// Compression middleware
export const compressionMiddleware = compression({
  level: 6, // Set the level of compression (1-9)
  threshold: 1024, // Only compress responses larger than 1 KB
});
