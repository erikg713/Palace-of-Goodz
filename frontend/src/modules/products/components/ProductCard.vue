<template>
  <div class="product-card">
    <img :src="product.imageUrl" :alt="`Image of ${product.name}`" />
    <h3>{{ product.name }}</h3>
    <p>{{ product.description }}</p>
    <p>{{ product.price }} π</p>
    <button
      @click="handlePurchase"
      :disabled="isProcessing"
      :aria-busy="isProcessing"
      :aria-label="`Buy ${product.name} with Pi`"
    >
      {{ isProcessing ? 'Processing...' : 'Buy with Pi' }}
    </button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { initiatePayment } from '@/services/paymentApi';
import { usePi } from '@/composables/usePi'; // Assuming Vue composables

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { userWallet } = usePi();
    const isProcessing = ref(false);

    const handlePurchase = async () => {
      if (!userWallet.value) {
        alert('Please connect your Pi Wallet to proceed.');
        return;
      }

      isProcessing.value = true;
      try {
        await initiatePayment(props.product.price, props.product._id, userWallet.value);
        alert('Payment initiated. Please complete it in the Pi Wallet app.');
      } catch (error) {
        console.error('Payment failed:', error);
        alert('Payment could not be processed. Please try again later.');
      } finally {
        isProcessing.value = false;
      }
    };

    return { isProcessing, handlePurchase };
  },
};
</script>
