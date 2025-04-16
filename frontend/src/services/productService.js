import api from './api';

export const getProducts = () => api.get('/products');
export const addProduct = (product) => api.post('/products', product);

