<script>
export default {
  mounted() {
    const scopes = ['payments'];

    function onIncompletePaymentFound(payment) {
      console.log('Found incomplete payment', payment);
    }

    Pi.authenticate(scopes, onIncompletePaymentFound)
      .then(async function (auth) {
        const res = await fetch('/api/auth/pi-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(auth),
        });
        const data = await res.json();
        console.log('User logged in:', data);
        // Route to dashboard, store in localStorage, etc.
      })
      .catch(console.error);
  },
};
</script>
