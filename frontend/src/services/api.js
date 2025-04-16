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
