// src/composables/usePiSDK.js
import { onMounted } from 'vue';

export function usePiSDK() {
  const initPiSDK = () => {
    return new Promise((resolve) => {
      window.addEventListener('sdkReady', () => {
        const sandboxMode = import.meta.env.MODE === 'development'; // Use Vite's import.meta.env
        Pi.init({ version: "2.0", sandbox: sandboxMode });
        resolve();
      });
    });
  };

  onMounted(async () => {
    await initPiSDK();
  });

  return {
    initPiSDK
  };
}
