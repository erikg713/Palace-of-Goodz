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
