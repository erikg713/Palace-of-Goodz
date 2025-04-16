// src/modules/payments/composables/usePiPayments.js

import { ref } from 'vue';
import { createPiPayment, verifyPiPayment } from '@/modules/payments/services/mockPiPaymentService'; // Use mock service

export default function usePiPayments() {
  const paymentStatus = ref(null);
  const paymentError = ref(null);
  const isLoading = ref(false);

  const initiatePiPayment = async (paymentDetails) => {
    isLoading.value = true;
    paymentStatus.value = 'pending';
    paymentError.value = null;

    try {
      const payment = await createPiPayment(paymentDetails);
      paymentStatus.value = 'initiated';
      // Simulate external confirmation (e.g., user confirming in Pi app)
      setTimeout(async () => {
        try {
          await confirmPiPayment(payment.paymentId);
        } catch (error) {
          console.error('Simulated confirmation failed:', error);
        }
      }, 3000); // Simulate user confirmation after 3 seconds
      return payment;
    } catch (error) {
      paymentStatus.value = 'failed';
      paymentError.value = error;
      console.error("Payment initiation failed:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const confirmPiPayment = async (paymentId) => {
    isLoading.value = true;
    paymentStatus.value = 'verifying';
    paymentError.value = null;

    try {
      const verification = await verifyPiPayment(paymentId);
      paymentStatus.value = 'completed';
      return verification;
    } catch (error) {
      paymentStatus.value = 'verification_failed';
      paymentError.value = error;
      console.error("Payment verification failed:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    paymentStatus,
    paymentError,
    isLoading,
    initiatePiPayment,
    confirmPiPayment
  };
}
import { ref } from 'vue';
let createPiPayment, verifyPiPayment;

if (process.env.NODE_ENV === 'development') {
  const mockService = require('@/modules/payments/services/mockPiPaymentService');
  createPiPayment = mockService.createPiPayment;
  verifyPiPayment = mockService.verifyPiPayment;
} else {
  const realService = require('@/modules/payments/services/piPaymentService');
  createPiPayment = realService.createPiPayment;
  verifyPiPayment = realService.verifyPiPayment;
}
