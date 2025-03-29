import { useState, useEffect, useMemo } from "react";

type CartItem = {
  name: string;
  price: string;
};

const CartItemComponent = ({ item, onRemove }: { item: CartItem; onRemove: () => void }) => (
  <li className="flex justify-between items-center">
    <span>{item.name}</span>
    <span>${item.price}</span>
    <button className="bg-red-500 px-2 py-1 rounded-lg text-white" onClick={onRemove}>Remove</button>
  </li>
);

const CartSummary = ({ totalPrice, clearCart }: { totalPrice: string; clearCart: () => void }) => (
  <div className="flex justify-between items-center mt-4">
    <span>Total: ${totalPrice}</span>
    <button className="bg-yellow-500 px-4 py-2 rounded-lg text-black" onClick={clearCart}>Clear Cart</button>
    <button className="bg-yellow-500 px-4 py-2 rounded-lg text-black">Checkout</button>
  </div>
);

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addItem = (item: CartItem) => {
    setCart([...cart, item]);
  };

  const removeItem = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
  }, [cart]);

  return (
    <div className="p-5 bg-black text-white fixed bottom-0 w-full flex flex-col justify-between">
      <h3>🛒 Cart ({cart.length} items)</h3>
      <ul>
        {cart.map((item, index) => (
          <CartItemComponent key={index} item={item} onRemove={() => removeItem(index)} />
        ))}
      </ul>
      <CartSummary totalPrice={totalPrice} clearCart={clearCart} />
    </div>
  );
}
