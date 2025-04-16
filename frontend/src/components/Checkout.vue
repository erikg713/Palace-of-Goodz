<script setup>
function initiatePayment(orderId, totalAmount) {
  const token = localStorage.getItem('token');

  Pi.createPayment({
    amount: totalAmount,
    memo: 'Palace of Goodz order',
    metadata: { orderId },
  }, {
    onReadyForServerApproval: paymentId => {
      fetch('/api/payments/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ paymentId }),
      });
    },
    onReadyForServerCompletion: (paymentId, txid) => {
      fetch('/api/payments/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ paymentId, txid }),
      });
    },
    onCancel: paymentId => console.log('Payment canceled:', paymentId),
    onError: (err, payment) => console.error('Payment error:', err, payment),
  });
}
</script>
