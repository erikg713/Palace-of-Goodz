export const API_URL: string = process.env.REACT_APP_API_URL || 'https://api.example.com';

if (!API_URL) {
    throw new Error('API_URL is not defined');
}

export const API = {
    BASE_URL: API_URL,
    LOGIN_ENDPOINT: '/auth/login',
    REGISTER_ENDPOINT: '/auth/register',
    // Add more endpoints as needed
};
