// src/modules/payments/services/paymentService.js
import api from '@/services/api';

export const createPayment = (paymentData) => api.post('/api/payment/create', paymentData);
export const verifyPayment = (paymentId) => api.post('/api/payment/verify', { paymentId });

