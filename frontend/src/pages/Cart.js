import { useCart } from "../context/CartContext";
import CheckoutButton from "../components/CheckoutButton";

export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price_in_pi * item.quantity, 0);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items yet.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item._id} className="flex justify-between items-center border-b py-2">
              <span>{item.name} (x{item.quantity})</span>
              <span>{item.price_in_pi * item.quantity} Pi</span>
              <button onClick={() => removeFromCart(item._id)} className="text-red-500">Remove</button>
            </div>
          ))}
          <div className="mt-4 font-bold">Total: {total} Pi</div>
          <CheckoutButton total={total} items={cart} />
        </div>
      )}
    </div>
  );
}
