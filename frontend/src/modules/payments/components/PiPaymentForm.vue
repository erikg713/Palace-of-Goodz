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

