import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'; // Use Vite env variable or fallback to localhost

export const fetchProducts = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/products`);
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProductById = async (id: string) => {
  try {
    const { data } = await axios.get(`${API_URL}/products/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

export const fetchOrdersByUser = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/orders`);
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const createTransaction = async (transaction) => {
  try {
    const { data } = await axios.post(`${API_URL}/transactions`, transaction);
    return data;
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
};
