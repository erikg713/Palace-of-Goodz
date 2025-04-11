<template>
  <div class="min-h-screen bg-gray-100 text-gray-900">
    <Header />
    <main class="p-4">
      <router-view />
    </main>
    <Footer />
    <PrivacyPolicyModal />
    <TermsOfServiceModal />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import PrivacyPolicyModal from './components/PrivacyPolicyModal.vue'
import TermsOfServiceModal from './components/TermsOfServiceModal.vue'
</script>
