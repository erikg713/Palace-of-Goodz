import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
script src="https://sdk.minepi.com/pi-sdk.js"></script>
<script>
  Pi.init({ version: "2.0", sandbox: true });
</script>

createApp(App).use(router).mount('#app')
const payment = await window.Pi.createPayment({
  amount: '400',
  memo: 'Purchase: Item #123',
  metadata: { orderId: 'abc123' }
});
