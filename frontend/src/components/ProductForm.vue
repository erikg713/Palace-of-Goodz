<template>
  <form @submit.prevent="submitProduct">
    <input v-model="form.name" placeholder="Product name" required />
    <textarea v-model="form.description" placeholder="Description"></textarea>
    <input type="number" v-model="form.price" placeholder="Price" required />
    <input v-model="form.imageUrl" placeholder="Image URL" />
    <button type="submit">Add Product</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useToken } from '@/pi/token'
const emit = defineEmits(['product-added'])
const { token } = useToken()

const form = ref({ name: '', description: '', price: '', imageUrl: '' })

const submitProduct = async () => {
  const res = await fetch('http://localhost:5000/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.value}`
    },
    body: JSON.stringify(form.value)
  })
  const data = await res.json()
  emit('product-added', data)
}
</script>
