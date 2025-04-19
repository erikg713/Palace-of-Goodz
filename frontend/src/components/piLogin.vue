<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-2xl font-semibold mb-6">Login with Pi Network</h1>
    <button @click="piLogin" class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl shadow-lg transition">
      Login with Pi
    </button>
    <p v-if="user" class="mt-4 text-green-600">Welcome, {{ user.username }}!</p>
    <p v-if="error" class="mt-4 text-red-600">Error: {{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'PiLogin',
  data() {
    return {
      user: null,
      error: null,
    };
  },
  methods: {
    async piLogin() {
      const scopes = ['payments'];

      function onIncompletePaymentFound(payment) {
        console.log('Unfinished payment found:', payment);
      }

      try {
        const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);

        const res = await fetch('/api/auth/pi-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(auth),
        });

        const data = await res.json();

        if (data.user) {
          this.user = data.user;
          localStorage.setItem('pi_user', JSON.stringify(data.user));
        } else {
          this.error = 'Authentication failed';
        }
      } catch (err) {
        this.error = err.message || 'Unknown error occurred';
        console.error(err);
      }
    }
  }
}
</script>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
}
</style>
