import api from "../api/axios";

export default function usePiPayments() {
  const startPayment = async (amount, memo, items) => {
    try {
      const username = localStorage.getItem("pi_username"); // saved at login
      const res = await api.post("/payments/create", { amount, memo, items, username });
      return res.data;
    } catch (err) {
      console.error("Payment error:", err);
      return { success: false };
    }
  };

  return { startPayment };
}
