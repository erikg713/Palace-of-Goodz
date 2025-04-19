methods: {
  async piLogin() {
    const scopes = ['payments'];

    function onIncompletePaymentFound(payment) {
      console.log('Found unfinished payment:', payment);
    }

    try {
      const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);

      const res = await fetch('/api/auth/pi-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(auth),
      });

      const data = await res.json();
      console.log('User verified:', data);

      // You could store the user info locally here:
      localStorage.setItem('pi_user', JSON.stringify(data.user));
    } catch (err) {
      console.error('Pi login failed:', err);
    }
  }
}
