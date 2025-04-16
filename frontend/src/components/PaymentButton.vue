// src/components/PaymentButton.vue
<template>
  <button @click="makePayment">Pay with Pi</button>
</template>

<script setup>
import { usePiSDK } from '@/composables/usePiSDK';
import { onMounted } from 'vue';

const { initPiSDK } = usePiSDK();

onMounted(async () => {
    await initPiSDK();
});

const makePayment = async () => {
  try {
    const paymentResult = await Pi.createPayment({
      amount: 10,
      memo: 'Payment for product',
      metadata: { productId: '123' }
    });
    console.log('Payment Result:', paymentResult);
  } catch (error) {
    console.error('Payment Error:', error);
  }
};
</script>
