import { ref, onMounted } from 'vue';
import { getProducts } from '@/services/productService';

export default function useProducts() {
  const products = ref([]);

  const loadProducts = async () => {
    const response = await getProducts();
    products.value = response.data;
  };

  onMounted(loadProducts);

  return {
    products,
    loadProducts
  };
}

