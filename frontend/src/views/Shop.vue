<!-- frontend/src/views/Shop.vue -->
<template>
  <div class="p-4">
    <div v-if="!user">
      <button @click="signIn" class="bg-purple-600 text-white px-4 py-2 rounded">Sign In with Pi</button>
    </div>

    <div v-else>
      <h2 class="text-lg font-semibold mb-2">Welcome, {{ user.username }}</h2>
      <div class="grid grid-cols-2 gap-4">
        <div v-for="product in products" :key="product.id" class="p-4 border rounded shadow">
          <h3 class="font-bold">{{ product.name }}</h3>
          <p>{{ product.description }}</p>
          <p class="text-green-600">{{ product.price }} π</p>
          <button
            class="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
            @click="orderProduct(product)"
          >Buy</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '../utils/axiosClient'

const user = ref(null)
const products = ref([
  { id: 1, name: 'Handcrafted Mug', description: 'Eco-friendly design', price: 1.5 },
  { id: 2, name: 'Pi T-shirt', description: 'Exclusive Pi design', price: 2.5 }
])

const onIncompletePaymentFound = (payment) => {
  console.log("onIncompletePaymentFound", payment)
  axios.post('/incomplete', { payment })
}

const signIn = async () => {
  const scopes = ["username", "payments"]
  const authResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound)
  await axios.post('/signin', { authResult })
  user.value = authResult.user
}

const orderProduct = async (product) => {
  if (!user.value) return signIn()

  const paymentData = {
    amount: product.price,
    memo: `Order for ${product.name}`,
    metadata: { productId: product.id }
  }

  const callbacks = {
    onReadyForServerApproval,
    onReadyForServerCompletion,
    onCancel,
    onError
  }

  await window.Pi.createPayment(paymentData, callbacks)
}

const onReadyForServerApproval = (paymentId) => {
  console.log("Approve:", paymentId)
  axios.post('/approve', { paymentId })
}

const onReadyForServerCompletion = (paymentId, txid) => {
  console.log("Complete:", paymentId, txid)
  axios.post('/complete', { paymentId, txid })
}

const onCancel = (paymentId) => {
  console.log("Cancelled:", paymentId)
  axios.post('/cancelled_payment', { paymentId })
}

const onError = (err, payment) => {
  console.error("Payment Error:", err, payment)
}
</script>
