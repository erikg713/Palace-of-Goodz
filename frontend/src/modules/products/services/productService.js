// src/modules/products/services/productService.js
import api from '@/services/api';

const getToken = () => localStorage.getItem('token');

export const fetchProducts = () => api.get('/api/products');
export const addProduct = (productData) => api.post('/api/products', productData, { headers: { 'Authorization': `Bearer ${getToken()}` } });
export const updateProduct = (id, productData) => api.put(`/api/products/${id}`, productData, { headers: { 'Authorization': `Bearer ${getToken()}` } });
export const deleteProduct = (id) => api.delete(`/api/products/${id}`, { headers: { 'Authorization': `Bearer ${getToken()}` } });
const API_BASE_URL = 'http://localhost:5000';

export const fetchProducts = async () => {
  const res = await fetch(`${API_BASE_URL}/products`);
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  return res.json();
};

export const deleteProduct = async (id, token) => {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
};

