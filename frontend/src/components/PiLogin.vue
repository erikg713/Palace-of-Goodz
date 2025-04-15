<template>
  <div>
    <button @click="login">Login with Pi</button>
  </div>
</template>

<script setup>
import { authenticateUser } from '@/pi/sdk'
import { emit } from 'vue'

const emit = defineEmits(['logged-in'])

const login = async () => {
  const auth = await authenticateUser((payment) => {
    console.log('Resume payment:', payment)
  })
  if (auth) {
    emit('logged-in', auth.accessToken)
  }
}
</script>
