import { useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState<{ name: string; price: string }[]>([]);

  return (
    <div className="p-5 bg-black text-white fixed bottom-0 w-full flex justify-between">
      <h3>🛒 Cart ({cart.length} items)</h3>
      <button className="bg-yellow-500 px-4 py-2 rounded-lg text-black">Checkout</button>
    </div>
  );
}
