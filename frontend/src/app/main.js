import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

app.config.globalProperties.$pi = {
  init: () => {
    return new Promise((resolve) => {
      window.addEventListener('sdkReady', () => {
        Pi.init({ version: "2.0", sandbox: true });
        resolve();
      });
    });
  }
};

app.mount('#app');


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.config.globalProperties.$pi = {
  init: () => {
    return new Promise((resolve) => {
      window.addEventListener('sdkReady', () => {
        Pi.init({ version: "2.0", sandbox: true });
        resolve();
      });
    });
  }
};

app.use(router);
app.mount('#app');
