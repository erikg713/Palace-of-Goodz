<!-- src/modules/products/views/ProductsPage.vue -->
<template>
  <div class="products-page">
    <h1>Products</h1>
    <div class="products-list">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ProductCard from '../components/ProductCard.vue';
import useProducts from '@/composables/useProducts';

const { products } = useProducts();
</script>

