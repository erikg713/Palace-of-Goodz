<!-- src/modules/payments/components/PiPaymentForm.vue -->
<template>
  <div>
    <button @click="initiatePayment">Pay with Pi</button>
  </div>
</template>

<script setup>
import usePiPayments from '@/modules/payments/composables/usePiPayments';

const { initiatePiPayment, paymentStatus } = usePiPayments();

const initiatePayment = async () => {
  try {
    // Define payment details
    const paymentDetails = {
      amount: 10,             // Example amount
      currency: 'PI',          // Currency is Pi
      description: 'Product Purchase' // Description
    };

    const payment = await initiatePiPayment(paymentDetails);
    // Handle successful payment initiation
    console.log('Pi payment initiated:', payment);
  } catch (error) {
    // Handle payment initiation error
    console.error('Failed to initiate Pi payment:', error);
  }
};
</script>

<template>
  <div>
    <button
      @click="initiatePayment"
      :disabled="isLoading"
    >
      <span v-if="!isLoading">Pay with Pi</span>
      <span v-else>Processing...</span>
    </button>

    <div v-if="isLoading">
      <p>Initiating payment...</p>
    </div>

    <div v-if="paymentStatus === 'initiated'">
      <p>Please confirm the payment in your Pi Network app.</p>
    </div>

    <div v-if="paymentStatus === 'verifying'">
      <p>Verifying payment...</p>
    </div>

    <div v-if="paymentStatus === 'completed'">
      <p>Payment successful!</p>
    </div>

    <div v-if="paymentStatus === 'failed' || paymentStatus === 'verification_failed'">
      <p>Payment failed: {{ paymentError.message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import usePiPayments from '@/modules/payments/composables/usePiPayments';

const {
  paymentStatus,
  paymentError,
  isLoading,
  initiatePiPayment,
  confirmPiPayment,
  setVerificationTimeout,
} = usePiPayments();

const paymentDetails = ref({
  amount: 10,
  currency: 'PI',
  description: 'Product Purchase',
});

const initiatePayment = async () => {
  try {
    await initiatePiPayment(paymentDetails.value);
    // Set a timeout for payment verification
    setVerificationTimeout(() => {
      console.warn('Payment verification timed out.');
      paymentStatus.value = 'verification_failed';
      paymentError.value = new Error('Payment verification timed out.');
    }, 60000); // Timeout after 60 seconds

    console.log('Payment Initiated Successfully!');
  } catch (error) {
    console.error('Failed to Initiate Payment:', error);
  }
};
</script>
