import cors from "cors";

// CORS middleware
export const corsMiddleware = cors({
  origin: process.env.ALLOWED_ORIGINS?.split(",") || "*", // Allow specific origins or all by default
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
});
