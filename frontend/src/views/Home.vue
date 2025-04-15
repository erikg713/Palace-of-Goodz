<script setup>
import { authenticateUser } from '@/pi/sdk'
import { startPayment } from '@/pi/payments'

const authUser = async () => {
  const auth = await authenticateUser((payment) => {
    console.log('Resume incomplete payment:', payment);
  });
  console.log('Logged in Pi user:', auth.user.username);
};

const buyTestProduct = async () => {
  await startPayment({
    amount: 3.14,
    memo: 'Test item in sandbox',
    metadata: { itemId: 'sandbox001' }
  }, {
    onApproval: (paymentId) => console.log('Approved:', paymentId),
    onComplete: (paymentId, txid) => console.log('Completed:', txid),
    onCancel: (id) => console.log('Cancelled:', id),
    onError: (err) => console.error('Error:', err),
  });
};
</script>

<template>
  <div>
    <h1>Palace of Goodz</h1>
    <button @click="authUser">Login with Pi</button>
    <button @click="buyTestProduct">Buy Test Product</button>
  </div>
</template>
