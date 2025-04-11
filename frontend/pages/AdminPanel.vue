// File: frontend/src/pages/AdminPanel.vue <template>

  <section class="max-w-6xl mx-auto py-8">
    <h2 class="text-2xl font-bold mb-4 text-center">Admin Panel</h2>
    <div v-if="loading" class="text-center">Loading orders...</div>
    <div v-else-if="!orders.length" class="text-center">No orders found.</div>
    <table v-else class="w-full border-collapse bg-white shadow rounded-xl">
      <thead>
        <tr class="bg-gray-100 text-left text-sm">
          <th class="p-3">User</th>
          <th class="p-3">Product</th>
          <th class="p-3">TXID</th>
          <th class="p-3">Status</th>
          <th class="p-3">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order._id" class="border-t text-sm">
          <td class="p-3">{{ order.username }}</td>
          <td class="p-3">{{ order.productId }}</td>
          <td class="p-3 break-all">{{ order.txid }}</td>
          <td class="p-3">{{ order.status }}</td>
          <td class="p-3">{{ new Date(order.createdAt).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template><script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const orders = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const auth = await Pi.authenticate(['username'], () => {})
    const res = await axios.get(`http://localhost:3000/orders?admin=${auth.user.uid}`)
    orders.value = res.data.orders
  } catch (err) {
    alert('Admin access denied or error occurred.')
    console.error(err)
  } finally {
    loading.value = false
  }
})
</script>
