export const API = {
  /**
 * The base URL for the API.
 * Replace with the actual URL as per your environment configuration.
 */
export const API_URL = process.env.REACT_APP_API_URL || 'https://api.example.com';
    BASE_URL: process.env.REACT_APP_API_URL || 'https://api.example.com',
    LOGIN_ENDPOINT: '/auth/login',
    REGISTER_ENDPOINT: '/auth/register',
    // Add more endpoints as needed
};
export const API_URL: string = process.env.REACT_APP_API_URL || 'https://api.example.com';
if (!API_URL) {
    throw new Error('API_URL is not defined');
}
