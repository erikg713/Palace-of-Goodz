<template>
  <div>
    <button @click="pay">Pay 3.14π for Test Item</button>
  </div>
</template>

<script setup>
import { startPayment } from '@/pi/payments'
const props = defineProps({ token: String })

const pay = () => {
  startPayment({
    amount: 3.14,
    memo: 'Test item purchase',
    metadata: { productId: 'test001' }
  }, props.token)
}
</script>
