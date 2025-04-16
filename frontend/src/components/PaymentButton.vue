<template>
  <div>
    <button
      @click="initiatePiPayment"
      :disabled="loading"
      class="bg-indigo-600 text-white px-6 py-3 rounded-xl shadow hover:bg-indigo-700 disabled:opacity-50 transition-all duration-300"
    >
      <span v-if="!loading">Pay with Pi</span>
      <span v-else class="animate-pulse">Processing...</span>
    </button>

    <!-- Toast Notifications -->
    <Toast v-if="toast.message" :message="toast.message" :type="toast.type" @close="toast.message = ''" />

    <!-- Payment Confirmation Modal -->
    <PaymentModal
      v-if="showModal"
      :txid="txid"
      :purchaseSummary="purchaseSummary"
      :user="authUser"
      @close="closeModal"
    />

    <!-- Payment History Panel -->
    <HistoryPanel />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Toast from './Toast.vue';
import PaymentModal from './PaymentModal.vue';
import HistoryPanel from './HistoryPanel.vue';
import { savePayment } from '../utils/paymentHistory.js';

const loading = ref(false);
const showModal = ref(false);
const txid = ref('');
const purchaseSummary = ref(null);
const authUser = ref(null);
const toast = ref({ message: '', type: '' });

const initiatePiPayment = () => {
  loading.value = true;
  toast.value.message = '';
  showModal.value = false;

  // Pi SDK authentication
  Pi.authenticate(['payments'], (incompletePayment) => {
    console.log("Found incomplete payment:", incompletePayment);
  })
    .then(auth => {
      authUser.value = auth.user;
      console.log(`Authenticated as ${auth.user.username}`);
      
      // Initiate payment using Pi SDK
      Pi.createPayment({
        amount: 3.14,
        memo: "Palace of Goodz Order",
        metadata: {
          username: auth.user.username,
          userId: auth.user.uid,
          productId: "abc123"
        }
      }, {
        async onReadyForServerApproval(paymentId) {
          try {
            // Call your backend to approve the payment
            await fetch('/api/payment/approve', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ paymentId })
            });
          } catch (err) {
            toast.value = { message: 'Approval failed on server.', type: 'error' };
          }
        },
        async onReadyForServerCompletion(paymentId, paymentTxid) {
          try {
            const res = await fetch('/api/payment/complete', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ paymentId, txid: paymentTxid })
            });
            if (res.ok) {
              txid.value = paymentTxid;
              purchaseSummary.value = {
                amount: 3.14,
                memo: "Palace of Goodz Order",
                timestamp: new Date().toISOString()
              };

              // Save payment locally as history
              savePayment({
                txid: paymentTxid,
                ...purchaseSummary.value,
                user: auth.user,
              });
              
              showModal.value = true;
              toast.value = { message: 'Payment successful!', type: 'success' };
            } else {
              toast.value = { message: 'Server refused payment completion.', type: 'error' };
            }
          } catch (err) {
            toast.value = { message: 'Error completing payment.', type: 'error' };
          } finally {
            loading.value = false;
          }
        },
        onCancel(paymentId) {
          console.log("User canceled payment", paymentId);
          loading.value = false;
          toast.value = { message: 'Payment canceled.', type: 'warning' };
        },
        onError(error) {
          console.error("Payment error:", error);
          toast.value = { message: 'Payment failed: ' + error.message, type: 'error' };
          loading.value = false;
        }
      });
    })
    .catch(err => {
      console.error("Pi Authentication failed", err);
      toast.value = { message: 'Authentication error: ' + err.message, type: 'error' };
      loading.value = false;
    });
};

const closeModal = () => {
  showModal.value = false;
};
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}
</style>
