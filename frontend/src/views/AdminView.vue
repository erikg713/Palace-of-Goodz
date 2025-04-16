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
<template>
  <div class="max-w-4xl mx-auto p-4 space-y-6">
    <h2 class="text-3xl font-bold text-center">Admin Panel</h2>
    <ProductForm @product-added="refresh" />
    <ProductList :refresh-key="refreshKey" />
  </div>
</template>

<script setup>
import ProductForm from '@/components/ProductForm.vue'
import ProductList from '@/components/ProductList.vue'
import { ref } from 'vue'

const refreshKey = ref(0)
const refresh = () => refreshKey.value++
</script>
