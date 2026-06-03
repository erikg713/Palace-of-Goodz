/**
 * Authentication Helper Functions
 * 
 * Provides reusable utilities for admin access checks and other auth-related operations
 */

/**
 * Creates an admin checker function with O(1) lookup performance
 * @param {string[]} adminUids - Array of authorized admin UIDs
 * @returns {Function} Function to check if a UID is admin
 */
export const createAdminChecker = (adminUids = []) => {
  const adminSet = new Set(adminUids);
  
  return (uid) => {
    // Input validation
    if (!uid || typeof uid !== 'string') {
      return false;
    }
    
    const normalizedUid = uid.trim();
    
    // Reject empty strings after trimming
    if (normalizedUid.length === 0) {
      return false;
    }
    
    return adminSet.has(normalizedUid);
  };
};

/**
 * Parses admin UIDs from environment variable string
 * @param {string} envString - Comma-separated UIDs from environment
 * @returns {string[]} Array of trimmed, non-empty UIDs
 */
export const parseAdminUids = (envString) => {
  if (!envString) {
    return [];
  }
  
  return envString
    .split(',')
    .map((uid) => uid.trim())
    .filter(Boolean);
};
