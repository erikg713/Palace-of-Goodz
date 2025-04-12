// File: frontend/src/components/PrivacyPolicyModal.vue <template>

  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
    <div class="bg-white max-w-2xl w-full p-6 rounded-xl shadow-lg overflow-y-auto max-h-[90vh]">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Privacy Policy</h2>
        <button @click="show = false" class="text-gray-500 hover:text-black">&times;</button>
      </div>
      <div class="text-sm text-gray-700 space-y-4">
        <p>
          Palace of Goodz respects your privacy. We only collect information necessary to complete transactions on the Pi Network. This includes your Pi username and the details of your orders.
        </p>
        <p>
          We do not collect or store emails, phone numbers, or any personally identifiable information outside of the Pi platform.
        </p>
        <p>
          All transactions are secured via the official Pi SDK, and we do not share your data with third parties.
        </p>
        <p>
          If you have questions about our data usage, contact us in-app.
        </p>
      </div>
    </div>
  </div>
</template><script setup>
import { ref } from 'vue'
const show = ref(false)

// Automatically expose for header/footer toggle buttons
if (!window.__PrivacyPolicyModal__) window.__PrivacyPolicyModal__ = show
</script>
