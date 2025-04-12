// File: frontend/src/components/Footer.vue <template>

  <footer class="bg-gray-900 text-white text-center py-4 text-sm">
    <p>
      © 2025 Palace of Goodz. All rights reserved.
      <span class="mx-2">|</span>
      <button @click="openPrivacy" class="underline hover:text-yellow-400">Privacy Policy</button>
      <span class="mx-2">|</span>
      <button @click="openTerms" class="underline hover:text-yellow-400">Terms of Service</button>
    </p>
  </footer>
</template><script setup>
function openPrivacy() {
  if (window.__PrivacyPolicyModal__) window.__PrivacyPolicyModal__.value = true
}

function openTerms() {
  if (window.__TermsOfServiceModal__) window.__TermsOfServiceModal__.value = true
}
</script>
