import { verifyPiTransaction } from "../utils/verifyTransaction";

export const processPaymentVerification = async (paymentId: string): Promise<boolean> => {
  return await verifyPiTransaction(paymentId);
};
