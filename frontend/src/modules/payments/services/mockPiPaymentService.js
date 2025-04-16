// src/modules/payments/services/mockPiPaymentService.js

const mockPaymentData = {
  paymentId: 'mockPaymentId123',
  status: 'pending',
  amount: 10,
  currency: 'PI'
};

export const createPiPayment = async (paymentDetails) => {
  console.log('Mock API: createPiPayment called with:', paymentDetails);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockPaymentData);
    }, 1000); // Simulate network delay
  });
};

export const verifyPiPayment = async (paymentId) => {
  console.log('Mock API: verifyPiPayment called with:', paymentId);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        paymentId: paymentId,
        status: 'completed'
      });
    }, 1500); // Simulate network delay
  });
};
