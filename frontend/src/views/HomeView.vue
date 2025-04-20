<template>
  <div class="home">
    <h1>Palace of Goodz</h1>
    <!-- Step 1: Login -->
    <PiLogin @logged-in="onLogin" />

    <!-- Step 2: Once logged in, show payment button -->
    <PiPayment
      v-if="token"
      :token="token"
      :amount="1.00"
      @completed="onPaymentCompleted"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PiLogin from '@/components/PiLogin.vue';
import PiPayment from '@/components/PiPayment.vue';

const token = ref(null);

function onLogin(auth) {
  token.value = auth;  // auth.uid, username, etc.
}

function onPaymentCompleted({ paymentId, txid }) {
  console.log('Payment successful:', paymentId, txid);
  // e.g. clear cart, redirect to order confirmation page
}
</script>
