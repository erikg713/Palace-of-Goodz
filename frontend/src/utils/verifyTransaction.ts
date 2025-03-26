import { getPiPayment, PiPayment } from "../services/piService";

export const verifyPiTransaction = async (paymentId: string): Promise<boolean> => {
  try {
    const payment: PiPayment | null = await getPiPayment(paymentId);

    if (!payment || typeof payment.status !== "string") {
      console.error("⚠️ Invalid response from Pi API");
      return false;
    }

    return payment.status.toUpperCase() === "COMPLETED";
  } catch (error) {
    console.error("⚠️ Error verifying Pi transaction:", error);
    return false;
  }
};
