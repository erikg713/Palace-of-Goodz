import React, { useState } from 'react';
import { initiatePayment } from '../services/paymentApi';
import { usePi } from '../contexts/PiContext';
import { notification } from 'antd'; // Example notification library

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { userWallet } = usePi();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchase = async () => {
    if (!userWallet) {
      notification.error({
        message: 'Wallet Not Connected',
        description: 'Please connect your Pi Wallet to proceed.',
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Initiate payment process
      const payment = await initiatePayment(product.price, product._id, userWallet);
      notification.success({
        message: 'Payment Initiated',
        description: 'Please complete it in the Pi Wallet app.',
      });
    } catch (error) {
      console.error('Payment failed:', error);
      notification.error({
        message: 'Payment Failed',
        description: 'Payment could not be processed. Please try again later.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={`Image of ${product.name}`} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>{product.price} π</p>
      <button
        onClick={handlePurchase}
        disabled={isProcessing}
        aria-busy={isProcessing}
        aria-label={`Buy ${product.name} with Pi`}
      >
        {isProcessing ? 'Processing...' : 'Buy with Pi'}
      </button>
    </div>
  );
};

export default ProductCard;
<template>
  <div class="border rounded p-4 shadow flex items-center justify-between">
    <div>
      <h3 class="font-bold text-lg">{{ product.name }} - {{ product.price }}π</h3>
      <p class="text-sm text-gray-600">{{ product.description }}</p>
      <p class="text-xs text-purple-600 font-medium uppercase">{{ product.category }}</p>
    </div>
    <button
      @click="$emit('delete', product._id)"
      class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
    >
      Delete
    </button>
  </div>
</template>

<script>
export default {
  props: {
    product: { type: Object, required: true },
  },
};
</script>
