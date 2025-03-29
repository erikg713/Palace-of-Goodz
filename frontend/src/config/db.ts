import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URI,
});

const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log(`✅ PostgreSQL Connected: ${client.host}`);
    client.release();
  } catch (error) {
    console.error(`❌ PostgreSQL Connection Error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
