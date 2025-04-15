<template>
  <div class="home">
    <h1>Palace of Goodz</h1>
    <PiLogin @logged-in="onLoggedIn" />
    <button v-if="token" @click="buyItem">Buy Test Product (3.14π)</button>
  </div>
</template>

<script setup>
import PiLogin from '@/components/PiLogin.vue'
import { ref } from 'vue'
import { startPayment } from '@/pi/payments'

const token = ref(null)

const onLoggedIn = (accessToken) => {
  token.value = accessToken
}

const buyItem = async () => {
  await startPayment({
    amount: 3.14,
    memo: 'Test item from sandbox',
    metadata: { productId: 'test001' }
  }, token.value)
}
</script>
