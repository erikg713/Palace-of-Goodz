import React, { useState } from 'react';
import { initiatePayment } from '../services/paymentApi';
import { usePi } from '../contexts/PiContext';

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
      alert('Please connect your Pi Wallet to proceed.');
      return;
    }

    setIsProcessing(true);
    try {
      // Initiate payment process
      const payment = await initiatePayment(product.price, product._id, userWallet);
      alert('Payment initiated. Please complete it in the Pi Wallet app.');
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment could not be processed. Please try again later.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
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
