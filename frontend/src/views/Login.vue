<!DOCTYPE html>
<html lang="en">
<head>
  <!-- … -->
  <script src="https://sdk.minepi.com/pi-sdk.js"></script>
  <script>
    // Initialize Pi SDK for all pages
    Pi.init({ version: "2.0", sandbox: true });
  </script>
</head>
<body>
  <div id="app"></div>
  <!-- Your Vue bundle will mount into #app -->
  <script type="module" src="/src/main.js"></script>
</body>
</html>

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
