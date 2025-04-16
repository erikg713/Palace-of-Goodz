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
