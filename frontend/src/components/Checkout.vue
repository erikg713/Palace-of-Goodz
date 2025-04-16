<script setup>
const initiatePiPayment = () => {
  const scopes = ['payments'];

  Pi.authenticate(scopes, (payment) => {
    console.log("Found incomplete payment:", payment);
  })
  .then(auth => {
    console.log(`Authenticated as ${auth.user.username}`);

    Pi.createPayment({
      amount: 3.14,
      memo: "Purchase from Palace of Goodz",
      metadata: { productId: "xyz123", buyer: auth.user.uid }
    }, {
      onReadyForServerApproval(paymentId) {
        fetch('/api/payment/approve', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentId })
        });
      },
      onReadyForServerCompletion(paymentId, txid) {
        fetch('/api/payment/complete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentId, txid })
        });
      },
      onCancel(paymentId) {
        console.log("User canceled payment", paymentId);
      },
      onError(error, payment) {
        console.error("Payment failed", error, payment);
      }
    });
  })
  .catch(err => {
    console.error("Pi Authentication failed", err);
  });
};
</script>

<template>
  <button @click="initiatePiPayment" class="bg-purple-600 text-white px-4 py-2 rounded-xl shadow">
    Pay with Pi
  </button>
</template>
<script setup>
import { ref } from 'vue';

const loading = ref(false);
const success = ref(false);
const errorMsg = ref('');

const initiatePiPayment = () => {
  loading.value = true;
  errorMsg.value = '';

  Pi.authenticate(['payments'], () => {})
    .then(auth => {
      Pi.createPayment({
        amount: 3.14,
        memo: "Palace of Goodz Order",
        metadata: {
          username: auth.user.username,
          userId: auth.user.uid,
          productId: "abc123"
        }
      }, {
        async onReadyForServerApproval(paymentId) {
          await fetch('/api/payment/approve', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentId })
          });
        },
        async onReadyForServerCompletion(paymentId, txid) {
          const res = await fetch('/api/payment/complete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentId, txid })
          });

          if (res.ok) success.value = true;
          else errorMsg.value = 'Server refused payment completion.';
        },
        onCancel() {
          loading.value = false;
        },
        onError(err) {
          errorMsg.value = 'Payment failed: ' + err.message;
          loading.value = false;
        }
      });
    })
    .catch(err => {
      errorMsg.value = 'Authentication error: ' + err.message;
      loading.value = false;
    });
};
</script>

<template>
  <div>
    <button @click="initiatePiPayment" :disabled="loading" class="bg-indigo-600 text-white px-4 py-2 rounded-xl">
      {{ loading ? 'Processing...' : 'Pay with Pi' }}
    </button>

    <div v-if="success" class="text-green-600 mt-4">Payment successful! Thank you!</div>
    <div v-if="errorMsg" class="text-red-600 mt-4">{{ errorMsg }}</div>
  </div>
</template>
