<script setup>
import { onMounted } from 'vue';

function loginWithPi() {
  const scopes = ['payments'];

  Pi.authenticate(scopes, (payment) => {
    console.log('Incomplete payment found:', payment);
  }).then(auth => {
    console.log('Pi Auth Success:', auth);

    fetch('/api/auth/pi-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(auth),
    })
    .then(res => res.json())
    .then(data => {
      localStorage.setItem('token', data.token); // Save token for later
    });
  }).catch(console.error);
}
</script>

<template>
  <button @click="loginWithPi">Login with Pi</button>
</template>

<script setup>
import { piLogin } from '@/utils/piLogin';
import axios from 'axios';

const login = async () => {
  const user = await piLogin();
  await axios.post('/api/auth/login', {
    uid: user.uid,
    username: user.username,
  });
};
</script>
