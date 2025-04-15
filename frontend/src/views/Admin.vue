<template>
  <div>
    <h2>Admin Panel</h2>
    <ProductForm @product-added="fetchProducts" />
    <ProductList />
  </div>
</template>

<script setup>
import ProductForm from '@/components/ProductForm.vue'
import ProductList from '@/components/ProductList.vue'

const fetchProducts = () => {
  // handled inside ProductList
}
</script>
