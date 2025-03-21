import axios from 'axios';

const API_ROOT = 'http://localhost:5000/api';

export const fetchProducts = async () => {
    const response = await axios.get(`${API_ROOT}/products`);
    return response.data;
};

export const fetchProductById = async (id: string) => {
    const response = await axios.get(`${API_ROOT}/products/${id}`);
    return response.data;
};

export const fetchOrdersByUser = async () => {
    const response = await axios.get(`${API_ROOT}/orders`);
    return response.data;
};
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL; // Use Vite env variable

export const fetchProducts = async () => {
  const { data } = await axios.get(`${API_URL}/products`);
  return data;
};

export const createTransaction = async (transaction) => {
  const { data } = await axios.post(`${API_URL}/transactions`, transaction);
  return data;
};
