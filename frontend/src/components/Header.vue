// File: frontend/src/components/Header.vue <template>

  <header class="bg-white shadow-md py-4 px-6 flex items-center justify-between">
    <div class="flex items-center gap-4">
      <img src="/logo.png" alt="Palace of Goodz Logo" class="w-12 h-12 object-contain" />
      <h1 class="text-xl font-bold text-gray-800 tracking-wide">Palace of Goodz</h1>
    </div>
    <nav class="flex items-center gap-4">
      <RouterLink to="/" class="hover:underline text-sm font-medium">Home</RouterLink>
      <RouterLink to="/admin" class="hover:underline text-sm font-medium">Admin</RouterLink>
      <RouterLink to="/admin/products" class="hover:underline text-sm font-medium">Products</RouterLink>
      <button
        @click="authenticateWithPi"
        class="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold py-2 px-4 rounded shadow-md"
      >
        Login with Pi
      </button>
    </nav>
  </header>
</template><script setup>
import { RouterLink } from 'vue-router'

function authenticateWithPi() {
  const scopes = ['username', 'payments']
  Pi.authenticate(scopes, (payment) => {
    console.log('Incomplete payment found:', payment)
  })
    .then((auth) => {
      console.log('Authenticated as:', auth.user)
    })
    .catch((error) => {
      console.error('Pi Auth Error:', error)
    })
}
</script>
