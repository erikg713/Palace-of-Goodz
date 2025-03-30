import compression from "compression";

// Compression middleware with configurable options
export const compressionMiddleware = compression({
  level: parseInt(process.env.COMPRESSION_LEVEL, 10) || 6, // Set the level of compression (1-9)
  threshold: parseInt(process.env.COMPRESSION_THRESHOLD, 10) || 1024, // Only compress responses larger than 1 KB
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      // Don't compress responses with this request header
      return false;
    }
    // Fallback to standard filter function
    return compression.filter(req, res);
  }
});
