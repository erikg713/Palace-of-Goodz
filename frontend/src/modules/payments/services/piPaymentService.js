// src/modules/payments/services/piPaymentService.js
import api from '@/services/api';

/**
 * Initiates a Pi Network payment.
 * @param {Object} paymentDetails - Details required for creating the payment (e.g., amount, recipient).
 * @returns {Promise} - A promise that resolves with the payment initiation response.
 */
export const createPiPayment = async (paymentDetails) => {
  try {
    const response = await api.post('/api/payment/create', paymentDetails);
    return response.data;
  } catch (error) {
    console.error("Failed to initiate Pi payment:", error);
    throw error;
  }
};

/**
 * Verifies the status of a Pi Network payment.
 * @param {string} paymentId - The ID of the payment to verify.
 * @returns {Promise} - A promise that resolves with the payment verification response.
 */
export const verifyPiPayment = async (paymentId) => {
  try {
    const response = await api.post('/api/payment/verify', { paymentId });
    return response.data;
  } catch (error) {
    console.error("Failed to verify Pi payment:", error);
    throw error;
  }
import api from '@/services/api';

export const createPayment = (paymentData) => api.post('/api/payment/create', paymentData);
export const verifyPayment = (paymentId) => api.post('/api/payment/verify', { paymentId });

// src/modules/payments/services/piPaymentService.js
import api from '@/services/api';

/**
 * Initiates a Pi Network payment.
 * @param {Object} paymentDetails - Details required for creating the payment.
 * @returns {Promise} - A promise that resolves with the payment initiation response.
 */
export const createPiPayment = async (paymentDetails) => {
  try {
    const response = await api.post('/api/payment/create', paymentDetails);
    return response.data;
  } catch (error) {
    console.error("Failed to initiate Pi payment:", error);
    // Re-throw the error so that the component can handle it.
    throw error;
  }
};

/**
 * Verifies the status of a Pi Network payment.
 * @param {string} paymentId - The ID of the payment to verify.
 * @returns {Promise} - A promise that resolves with the payment verification response.
 */
export const verifyPiPayment = async (paymentId) => {
  try {
    const response = await api.post('/api/payment/verify', { paymentId });
    return response.data;
  } catch (error) {
    console.error("Failed to verify Pi payment:", error);
    // Re-throw the error so that the component can handle it.
    throw error;
  }
};
