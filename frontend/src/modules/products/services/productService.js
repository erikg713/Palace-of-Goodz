// src/modules/products/services/productService.js
import api from '@/services/api';

const getToken = () => localStorage.getItem('token');

export const fetchProducts = () => api.get('/api/products');
export const addProduct = (productData) => api.post('/api/products', productData, { headers: { 'Authorization': `Bearer ${getToken()}` } });
export const updateProduct = (id, productData) => api.put(`/api/products/${id}`, productData, { headers: { 'Authorization': `Bearer ${getToken()}` } });
export const deleteProduct = (id) => api.delete(`/api/products/${id}`, { headers: { 'Authorization': `Bearer ${getToken()}` } });

