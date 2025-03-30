import cors from "cors";

// Define allowed origins from environment variable or default to all origins
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",") : ["*"];

// Define CORS options
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., mobile apps, curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      console.log(`Allowed origin: ${origin}`);
      callback(null, true);
    } else {
      console.error(`Blocked origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
};

// Export CORS middleware with defined options
export const corsMiddleware = cors(corsOptions);
