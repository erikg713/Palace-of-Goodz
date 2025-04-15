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

<template>
  <form @submit.prevent="submitProduct" class="bg-white p-4 rounded shadow space-y-4">
    <div>
      <label class="block font-semibold">Name</label>
      <input v-model="form.name" class="w-full border rounded px-3 py-2" required />
    </div>
    <div>
      <label class="block font-semibold">Description</label>
      <textarea v-model="form.description" class="w-full border rounded px-3 py-2"></textarea>
    </div>
    <div>
      <label class="block font-semibold">Price (π)</label>
      <input v-model.number="form.price" type="number" class="w-full border rounded px-3 py-2" required />
    </div>
    <div>
      <label class="block font-semibold">Image URL</label>
      <input v-model="form.imageUrl" class="w-full border rounded px-3 py-2" />
    </div>
    <div>
  <label class="block font-semibold">Category</label>
  <select v-model="form.category" class="w-full border rounded px-3 py-2">
    <option value="">Select Category</option>
    <option value="clothing">Clothing</option>
    <option value="accessories">Accessories</option>
    <option value="collectibles">Collectibles</option>
    <option value="tech">Tech</option>
    <option value="other">Other</option>
  </select>
</div>
    <button type="submit" class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Add Product</button>
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
  if (res.ok) {
    form.value = { name: '', description: '', price: '', imageUrl: '' }
    emit('product-added')
  }
}
</script>
