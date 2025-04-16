<template>
  <div class="home">
    <h1>Palace of Goodz</h1>
    <PiLogin @logged-in="onLogin" />
    <PiPayment v-if="token" :token="token" />
  </div>
</template>

<script setup>
import PiLogin from '@/components/PiLogin.vue'
import PiPayment from '@/components/PiPayment.vue'
import { ref } from 'vue'

const token = ref(null)
const onLogin = (t) => { token.value = t }
</script>
