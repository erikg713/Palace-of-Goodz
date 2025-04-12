// File: frontend/src/pages/ProductManager.vue <template>

  <section class="max-w-5xl mx-auto py-10">
    <h2 class="text-2xl font-bold text-center mb-6">Manage Products</h2><form @submit.prevent="addProduct" class="grid gap-4 mb-10 bg-white p-6 rounded-xl shadow">
  <input v-model="newProduct.name" type="text" placeholder="Product Name" class="input" required />
  <textarea v-model="newProduct.description" placeholder="Description" class="input" required></textarea>
  <input v-model.number="newProduct.price" type="number" step="0.01" placeholder="Price in Π" class="input" required />
  <input v-model="newProduct.image" type="text" placeholder="Image URL" class="input" required />
  <button type="submit" class="bg-green-500 hover:bg-green-400 text-white font-semibold py-2 px-4 rounded">
    Add Product
  </button>
</form>

<div v-if="loading" class="text-center">Loading products...</div>
<div v-else-if="!products.length" class="text-center text-gray-600">No products available.</div>
<ul v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  <li v-for="product in products" :key="product._id" class="bg-white rounded-xl shadow p-4 relative">
    <img :src="product.image" alt="" class="w-full h-40 object-cover rounded mb-2" />
    <h3 class="text-lg font-bold">{{ product.name }}</h3>
    <p class="text-sm text-gray-600 line-clamp-2">{{ product.description }}</p>
    <p class="font-semibold mt-1">{{ product.price }} Π</p>
    <button @click="deleteProduct(product._id)" class="absolute top-2 right-2 text-red-600 hover:text-red-800">✕</button>
  </li>
</ul>

  </section>
</template><script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const adminUid = ref('')
const products = ref([])
const loading = ref(true)

const newProduct = ref({
  name: '',
  description: '',
  price: 0,
  image: ''
})

async function fetchProducts() {
  loading.value = true
  const res = await axios.get('http://localhost:3000/products')
  products.value = res.data.products
  loading.value = false
}

async function addProduct() {
  try {
    const res = await axios.post('http://localhost:3000/products', {
      ...newProduct.value,
      admin: adminUid.value
    })
    products.value.unshift(res.data.product)
    newProduct.value = { name: '', description: '', price: 0, image: '' }
  } catch (err) {
    alert('Failed to add product')
    console.error(err)
  }
}

async function deleteProduct(id) {
  try {
    await axios.delete(`http://localhost:3000/products/${id}`, {
      data: { admin: adminUid.value }
    })
    products.value = products.value.filter(p => p._id !== id)
  } catch (err) {
    alert('Failed to delete product')
    console.error(err)
  }
}

onMounted(async () => {
  try {
    const auth = await Pi.authenticate(['username'], () => {})
    adminUid.value = auth.user.uid
    await fetchProducts()
  } catch (err) {
    alert('Access denied or Pi auth failed.')
  }
})
</script><style scoped>
.input {
  @apply border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-300;
}
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
