<template>
  <div class="p-6 text-center">
    <button @click="loginWithPi" class="bg-purple-600 text-white px-6 py-3 rounded-xl">
      Login with Pi Network
    </button>
  </div>
</template>

<script>
export default {
  name: 'PiLogin',
  methods: {
    async loginWithPi() {
      const scopes = ['payments'];

      Pi.authenticate(scopes, this.onIncompletePaymentFound)
        .then(async (auth) => {
          const res = await fetch('/api/auth/pi-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(auth),
          });

          const data = await res.json();
          if (data && data.user) {
            localStorage.setItem('piUser', JSON.stringify(data.user));
            this.$router.push('/dashboard');
          }
        })
        .catch(console.error);
    },
    onIncompletePaymentFound(payment) {
      console.log('Incomplete payment found:', payment);
    }
  }
}
</script>

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
<button @click="piLogin">Login with Pi</button>
