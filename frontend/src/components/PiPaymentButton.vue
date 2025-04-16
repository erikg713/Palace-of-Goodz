<template>
  <button
    class="custom-pi-button"
    :class="{ 'is-loading': isLoading }"
    @click="initiatePayment"
    :disabled="isLoading"
  >
    <span v-if="!isLoading">
      <slot v-if="$slots.default" />
      <span v-else>Pay with Pi</span>
    </span>
    <span v-else>
      <div class="spinner"></div>
      Processing...
    </span>
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { usePiSDK } from '@/composables/usePiSDK';

const { initPiSDK } = usePiSDK();
const isLoading = ref(false);

onMounted(async () => {
  await initPiSDK();
});

const initiatePayment = async () => {
  isLoading.value = true;
  try {
    // Your Pi payment logic here
    console.log('Payment initiated!');
    // For demonstration purposes, simulate an API call
    // const paymentResult = await Pi.createPayment({
    //   amount: 10,
    //   memo: 'Payment for product',
    //   metadata: { productId: '123' }
    // });
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
    // console.log('Payment Result:', paymentResult);
  } catch (error) {
    console.error('Payment failed:', error);
    // Handle the error appropriately
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.custom-pi-button {
  background-color: var(--primary-color, #facc15); /* Use a CSS variable */
  color: var(--text-color, #111);
  padding: 0.75rem 1.5rem;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.custom-pi-button:hover {
  background-color: var(--primary-hover-color, #f0bb00);
}

.custom-pi-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border-left-color: #09f;
  animation: spin 1s linear infinite;
  display: inline-block;
  margin-right: 0.5em;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
