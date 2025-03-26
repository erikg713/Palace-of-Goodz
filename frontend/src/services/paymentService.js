import { verifyPiTransaction } from "../utils/verifyTransaction.js";

export const processPaymentVerification = async (paymentId) => {
  return await verifyPiTransaction(paymentId);
};
