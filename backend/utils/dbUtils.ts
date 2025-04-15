import { Pool, QueryResult, PoolClient } from 'pg';
import logger from '../utils/logger'; // Custom logger module for structured logging

// Dynamic pool configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: parseInt(process.env.DB_MAX_POOL_SIZE || '10'), // Allow dynamic pool size
  idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT_MS || '30000'), // Default 30 seconds
});

/**
 * Executes a database query with optional parameters.
 * Includes retry logic and dynamic logging for query debugging.
 * @param query - SQL query string
 * @param params - Optional query parameters
 * @param options - Optional settings (e.g., retry count, debug)
 * @returns Query result rows
 */
export const executeQuery = async (
  query: string,
  params: any[] = [],
  options: { retries?: number; debug?: boolean } = {}
): Promise<any> => {
  const { retries = 3, debug = false } = options;
  let attempts = 0;

  while (attempts <= retries) {
    const start = Date.now(); // Query start time
    try {
      const result: QueryResult = await pool.query(query, params);
      
      // Debugging logs
      if (debug) {
        const duration = Date.now() - start; // Query execution time
        logger.debug(`Query executed in ${duration}ms`, { query, params });
      }
      
      return result.rows;
    } catch (err) {
      attempts++;

      // Log error
      logger.error('Database query failed', {
        attempt: attempts,
        query,
        params,
        error: err.message,
      });

      // Retry logic for transient errors
      if (attempts > retries || !isTransientError(err)) {
        throw err; // Rethrow non-transient or exceeded retry errors
      }
    }
  }
};

/**
 * Checks if an error is transient (e.g., connection reset).
 * @param error - The error object
 * @returns Whether the error is transient
 */
const isTransientError = (error: any): boolean => {
  const transientErrorCodes = ['ECONNRESET', 'ETIMEDOUT']; // Add more as needed
  return transientErrorCodes.includes(error.code);
};

/**
 * Starts a new transaction and provides a client.
 * Includes debugging options.
 * @param debug - Whether to log transaction details
 * @returns Pool client for transaction use
 */
export const startTransaction = async (debug = false): Promise<PoolClient> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    if (debug) logger.debug('Transaction started');
    return client;
  } catch (err) {
    client.release();
    throw err;
  }
};

/**
 * Commits a transaction.
 * @param client - Pool client handling the transaction
 * @param debug - Whether to log commit details
 */
export const commitTransaction = async (client: PoolClient, debug = false): Promise<void> => {
  try {
    await client.query('COMMIT');
    if (debug) logger.debug('Transaction committed');
  } finally {
    client.release(); // Always release the client
  }
};

/**
 * Rolls back a transaction.
 * @param client - Pool client handling the transaction
 * @param debug - Whether to log rollback details
 */
export const rollbackTransaction = async (client: PoolClient, debug = false): Promise<void> => {
  try {
    await client.query('ROLLBACK');
    if (debug) logger.debug('Transaction rolled back');
  } finally {
    client.release(); // Always release the client
  }
};
