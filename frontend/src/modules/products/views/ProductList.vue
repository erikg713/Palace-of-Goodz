<template>
  <div class="grid gap-4">
    <ProductCard
      v-for="product in products"
      :key="product._id"
      :product="product"
      @delete-product="deleteProduct"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ProductCard from '../components/ProductCard.vue';
import useProducts from '../composables/useProducts';

const { products, loadProducts, deleteProduct } = useProducts();

onMounted(loadProducts);
</script>

