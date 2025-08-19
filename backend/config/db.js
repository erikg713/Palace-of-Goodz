import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ DB Connection Failed:", err.message);
    process.exit(1);
  }
};    logger.info("✅ Connected to MongoDB Database");
  } catch (error) {
    logger.error("❌ MongoDB Connection Failed. Retrying in 5s...", error);
    setTimeout(connectMongoDB, 5000);
  }
};
