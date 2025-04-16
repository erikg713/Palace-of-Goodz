<template>
  <div>
    <h1>Products</h1>
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>

<script setup>
import ProductCard from '@/modules/products/components/ProductCard.vue';
import useProducts from '@/modules/products/composables/useProducts';

const { products, loadProducts } = useProducts();

loadProducts();
</script>



<template>
  <div>
    <h1>Product List</h1>
    <ul>
      <li v-for="product in products" :key="product._id">
        {{ product.name }} - ${{ product.price }}
      </li>
    </ul>
  </div>
</template>

<script>
import { getProducts } from '../services/api';

export default {
  data() {
    return { products: [] };
  },
  async created() {
    this.products = await getProducts();
  },
};
</script>


<template>
  <div v-for="p in products" :key="p._id">
    <h3>{{ p.name }} - {{ p.price }}π</h3>
    <p>{{ p.description }}</p>
    <button @click="deleteProduct(p._id)">Delete</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToken } from '@/pi/token'
const { token } = useToken()

const products = ref([])

const fetchProducts = async () => {
  const res = await fetch('http://localhost:5000/products')
  products.value = await res.json()
}
<p class="text-xs text-purple-600 font-medium uppercase">{{ p.category }}</p>
const deleteProduct = async (id) => {
  await fetch(`http://localhost:5000/products/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token.value}` }
  })
  await fetchProducts()
}

onMounted(fetchProducts)
</script>

<template>
  <div class="grid gap-4">
    <div
      v-for="p in products"
      :key="p._id"
      class="border rounded p-4 shadow flex items-center justify-between"
    >
      <div>
        <h3 class="font-bold text-lg">{{ p.name }} - {{ p.price }}π</h3>
        <p class="text-sm text-gray-600">{{ p.description }}</p>
      </div>
      <button
        @click="deleteProduct(p._id)"
        class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useToken } from '@/pi/token'
const { token } = useToken()

const props = defineProps(['refreshKey'])
const products = ref([])

const fetchProducts = async () => {
  const res = await fetch('http://localhost:5000/products')
  products.value = await res.json()
}

const deleteProduct = async (id) => {
  await fetch(`http://localhost:5000/products/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token.value}` }
  })
  await fetchProducts()
}

watchEffect(() => {
  fetchProducts()
})
</script>
<h3 class="font-bold text-lg">{{ p.name }} - {{ p.price }}π</h3>
<p class="text-xs text-purple-600 font-medium uppercase">{{ p.category }}</p>
<p class="text-sm text-gray-600">{{ p.description }}</p>
<!-- ProductList.vue -->
<template>
  <div>
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue';

export default {
  components: { ProductCard },
  data() {
    return {
      products: [{ id: 1, name: 'Phone' }, { id: 2, name: 'Laptop' }],
    };
  },
};
</script>
