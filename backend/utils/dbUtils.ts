// dbUtils.ts
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const executeQuery = async (query: string, params: any[] = []) => {
  try {
    const result = await pool.query(query, params);
    return result.rows;
  } catch (err) {
    console.error('Database query error', err);
    throw err; // Rethrow the error after logging
  }
};
