import axios from 'axios';

export const initiatePayment = async (price, productId, wallet) => {
  return axios.post('/api/payment', {
    price,
    productId,
    wallet,
  });
};
