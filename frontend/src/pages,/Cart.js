import { useCart } from "../context/CartContext";
import CheckoutButton from "../components/CheckoutButton";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  // Calculate total Pi cost
  const total = cart.reduce(
    (sum, item) => sum + item.price_in_pi * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🛍️ Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty. Start shopping!</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b pb-3"
              >
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-500">
                    {item.quantity} × {item.price_in_pi} Pi
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold">
                    {item.price_in_pi * item.quantity} Pi
                  </span>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total + Checkout */}
          <div className="mt-6 flex justify-between items-center">
            <h3 className="text-xl font-bold">Total: {total} Pi</h3>
            <CheckoutButton total={total} items={cart} />
          </div>
        </>
      )}
    </div>
  );
}
