import React, { useEffect, useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getCart, updateCartItem } from '../services/cartApi';

interface CartItem {
  productId: {
    _id: string;
    name: string;
  };
  quantity: number;
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      const cartItems = await getCart();
      setCart(cartItems);
    } catch (err) {
      setError('Failed to fetch cart items');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleUpdateQuantity = useCallback(async (productId: string, quantity: number) => {
    try {
      await updateCartItem(productId, quantity);
      fetchCart();
    } catch (err) {
      setError('Failed to update cart item');
    }
  }, [fetchCart]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Navbar />
      <h1>Shopping Cart</h1>
      {cart.length ? (
        cart.map((item) => (
          <div key={item.productId._id}>
            <h3>{item.productId.name}</h3>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleUpdateQuantity(item.productId._id, parseInt(e.target.value))}
            />
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
      <Footer />
    </div>
  );
};

export default Cart;
