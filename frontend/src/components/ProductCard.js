import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-xl shadow p-4 flex flex-col">
      <img src={product.image_url} alt={product.name} className="h-40 object-cover rounded" />
      <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-500">{product.description}</p>
      <p className="mt-2 font-bold">{product.price_in_pi} ⧫ Pi</p>
      <button
        className="mt-auto bg-purple-600 text-white px-3 py-1 rounded-lg hover:bg-purple-700"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}
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
