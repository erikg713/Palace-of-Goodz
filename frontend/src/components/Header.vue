// File: frontend/src/components/Header.vue <template>

  <header class="bg-white shadow-md py-4 px-6 flex items-center justify-between">
    <div class="flex items-center gap-4">
      <img
        src="/logo.png"
        alt="Palace of Goodz Logo"
        class="w-12 h-12 object-contain"
      />
      <h1 class="text-xl font-bold text-gray-800 tracking-wide">
        Palace of Goodz
      </h1>
    </div>
    <button
      @click="authenticateWithPi"
      class="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold py-2 px-4 rounded shadow-md"
    >
      Login with Pi
    </button>
  </header>
</template><script setup>
function authenticateWithPi() {
  const scopes = ['username', 'payments'];
  Pi.authenticate(scopes, (payment) => {
    console.log('Incomplete payment found:', payment);
  })
    .then((auth) => {
      console.log('Authenticated as:', auth.user);
      // Send auth.user.uid and accessToken to backend for verification
    })
    .catch((error) => {
      console.error('Pi Auth Error:', error);
    });
}
</script>
