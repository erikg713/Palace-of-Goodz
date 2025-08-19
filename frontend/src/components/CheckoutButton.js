import usePiPayments from "../hooks/usePiPayments";
import { useCart } from "../context/CartContext";

export default function CheckoutButton({ total, items }) {
  const { startPayment } = usePiPayments();
  const { clearCart } = useCart();

  const handleCheckout = async () => {
    const memo = `Order of ${items.length} items`;
    const result = await startPayment(total, memo, items);
    if (result.success) {
      clearCart();
      alert("✅ Payment successful! Order placed.");
    } else {
      alert("❌ Payment failed");
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
    >
      Pay {total} Pi
    </button>
  );
}
