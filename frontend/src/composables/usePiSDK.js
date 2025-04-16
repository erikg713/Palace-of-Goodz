import { ref } from 'vue';

const userWallet = ref(null);

export const usePi = () => {
  const connectWallet = (wallet) => {
    userWallet.value = wallet;
  };

  return { userWallet, connectWallet };
};
// src/composables/usePiSDK.js
import { onMounted } from 'vue';

export function usePiSDK() {
  const initPiSDK = () => {
    return new Promise((resolve) => {
      window.addEventListener('sdkReady', () => {
        Pi.init({ version: "2.0", sandbox: true });
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
