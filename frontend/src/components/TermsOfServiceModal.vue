// File: frontend/src/components/TermsOfServiceModal.vue <template>

  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
    <div class="bg-white max-w-2xl w-full p-6 rounded-xl shadow-lg overflow-y-auto max-h-[90vh]">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Terms of Service</h2>
        <button @click="show = false" class="text-gray-500 hover:text-black">&times;</button>
      </div>
      <div class="text-sm text-gray-700 space-y-4">
        <p>
          By using Palace of Goodz, you agree to transact exclusively in Pi cryptocurrency and abide by Pi Network's policies.
        </p>
        <p>
          All purchases are final once confirmed by the Pi blockchain. We are not responsible for incorrect orders caused by user error.
        </p>
        <p>
          You must use the Pi Browser and authenticate through the official Pi SDK. External logins or third-party currencies are not supported.
        </p>
        <p>
          Violation of these terms may result in access being revoked.
        </p>
      </div>
    </div>
  </div>
</template><script setup>
import { ref } from 'vue'
const show = ref(false)

// Expose to global for access from footer
if (!window.__TermsOfServiceModal__) window.__TermsOfServiceModal__ = show
</script>
