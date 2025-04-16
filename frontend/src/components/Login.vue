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
