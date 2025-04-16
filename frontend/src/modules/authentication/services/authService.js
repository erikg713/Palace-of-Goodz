// src/modules/authentication/services/authService.js
import api from '@/services/api';  // Assuming you have a base API service

export const signup = (userData) => api.post('/api/users/signup', userData);
export const login = (credentials) => api.post('/api/users/login', credentials);
export const getProfile = (token) => api.get('/api/users/profile', { headers: { 'Authorization': `Bearer ${token}` } });

