// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;


import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/' });

export const getProducts = async () => {
  const response = await API.get('products');
  return response.data;
};

export const getProductById = async (id) => {
  const response = await API.get(`products/${id}`);
  return response.data;
};

export const createProduct = async (data) => {
  const response = await API.post('products', data);
  return response.data;
};

// Add other methods like updateProduct and deleteProduct


import axios from 'axios'

const API_URL = 'http://localhost:3000/api' // Change to your backend URL

// User APIs
export function signupUser(data) {
  return axios.post(`${API_URL}/users/signup`, data)
}
export function loginUser(data) {
  return axios.post(`${API_URL}/users/login`, data)
}
export function getUserProfile(token) {
  return axios.get(`${API_URL}/users/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

// Product APIs
export function getProducts() {
  return axios.get(`${API_URL}/products`)
}
export function addProduct(data, token) {
  return axios.post(`${API_URL}/products`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })
}
