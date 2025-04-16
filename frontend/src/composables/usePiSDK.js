import { ref } from 'vue';

const userWallet = ref(null);

export const usePi = () => {
  const connectWallet = (wallet) => {
    userWallet.value = wallet;
  };

  return { userWallet, connectWallet };
};
