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
