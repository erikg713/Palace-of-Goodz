import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getCart, updateCartItem } from '../services/cartApi';

const Cart: React.FC = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function fetchCart() {
      const cartItems = await getCart();
      setCart(cartItems);
    }
    fetchCart();
  }, []);

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    await updateCartItem(productId, quantity);
    // Refetch cart data to update UI
    fetchCart();
  };

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
