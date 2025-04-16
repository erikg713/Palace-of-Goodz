// src/modules/products/composables/useProducts.js
import { ref } from 'vue';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '@/modules/products/services/productService';

export default function useProducts() {
  const products = ref([]);

  const loadProducts = async () => {
    try {
      const response = await fetchProducts();
      products.value = response.data;
      return response;
    } catch (error) {
      console.error("Failed to load products", error);
      throw error;
    }
  };

  const createProduct = async (productData) => {
        try {
            const response = await addProduct(productData);
            products.value.push(response.data); // Optimistically update the products list
            return response;
        } catch (error) {
            console.error("Failed to create product", error);
            throw error;
        }
    };

  return {
    products,
    loadProducts,
      createProduct,
  };
}
import { ref } from 'vue';
import { fetchProducts, deleteProduct as deleteProductApi } from '../services/productService';
import { useToken } from '@/pi/token';

export default function useProducts() {
  const products = ref([]);
  const { token } = useToken();

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      products.value = data;
      return data;
    } catch (error) {
      console.error("Failed to load products:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteProductApi(id, token.value);
      products.value = products.value.filter(p => p._id !== id); // Optimistic update
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return {
    products,
    loadProducts,
    deleteProduct
  };
}
