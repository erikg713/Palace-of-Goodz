// src/modules/payments/composables/usePiPayments.js
import { ref } from 'vue';
import { createPiPayment, verifyPiPayment } from '@/modules/payments/services/piPaymentService';

export default function usePiPayments() {
  const paymentStatus = ref(null);
  const paymentError = ref(null);

  /**
   * Initiates a Pi payment and handles the response.
   * @param {Object} paymentDetails - Details required for creating the payment.
   * @returns {Promise<Object>} - The payment initiation response.
   */
  const initiatePiPayment = async (paymentDetails) => {
    paymentStatus.value = 'pending';
    paymentError.value = null;

    try {
      const payment = await createPiPayment(paymentDetails);
      paymentStatus.value = 'initiated';
      return payment;
    } catch (error) {
      paymentStatus.value = 'failed';
      paymentError.value = error;
      throw error;
    }
  };

  /**
   * Verifies a Pi payment and updates the payment status.
   * @param {string} paymentId - The ID of the payment to verify.
   * @returns {Promise<Object>} - The payment verification response.
   */
  const confirmPiPayment = async (paymentId) => {
    paymentStatus.value = 'verifying';
    paymentError.value = null;

    try {
      const verification = await verifyPiPayment(paymentId);
      paymentStatus.value = 'completed';
      return verification;
    } catch (error) {
      paymentStatus.value = 'verification_failed';
      paymentError.value = error;
      throw error;
    }
  };

  return {
    paymentStatus,
    paymentError,
    initiatePiPayment,
    confirmPiPayment
  };
}

// src/modules/payments/composables/usePiPayments.js
import { ref } from 'vue';
import { createPiPayment, verifyPiPayment } from '@/modules/payments/services/piPaymentService';

export default function usePiPayments() {
  const paymentStatus = ref(null);
  const paymentError = ref(null);
  const isLoading = ref(false);

  /**
   * Initiates a Pi payment and handles the response.
   * @param {Object} paymentDetails - Details required for creating the payment.
   * @returns {Promise<Object>} - The payment initiation response.
   */
  const initiatePiPayment = async (paymentDetails) => {
    isLoading.value = true;
    paymentStatus.value = 'pending';
    paymentError.value = null;

    try {
      const payment = await createPiPayment(paymentDetails);
      paymentStatus.value = 'initiated';
      return payment;
    } catch (error) {
      paymentStatus.value = 'failed';
      paymentError.value = error;
      // Specific error handling based on error type, e.g., invalid input.
      console.error("Payment initiation failed:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Verifies a Pi payment and updates the payment status.
   * @param {string} paymentId - The ID of the payment to verify.
   * @returns {Promise<Object>} - The payment verification response.
   */
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
      // Handle specific verification errors, e.g., payment not found.
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
