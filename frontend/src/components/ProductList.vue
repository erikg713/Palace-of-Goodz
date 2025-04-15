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

const deleteProduct = async (id) => {
  await fetch(`http://localhost:5000/products/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token.value}` }
  })
  await fetchProducts()
}

onMounted(fetchProducts)
</script>
