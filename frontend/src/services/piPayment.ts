import { Pi } from "pi-sdk";
import dotenv from "dotenv";

dotenv.config();

// Initialize Pi SDK
Pi.init({
  version: "2.0",
  sandbox: process.env.PI_SANDBOX === "true",
});

/**
 * Get payment details from Pi Network
 */
export const getPayment = async (paymentId: string) => {
  try {
    const payment = await Pi.getPayment(paymentId);
    return payment;
  } catch (error) {
    console.error("Error fetching Pi payment:", error);
    throw new Error("Failed to retrieve Pi payment details");
  }
};

/**
 * Complete a Pi Payment
 */
export const completePayment = async (paymentId: string) => {
  try {
    await Pi.completePayment(paymentId);
    console.log(`✅ Payment ${paymentId} completed successfully.`);
  } catch (error) {
    console.error("Error completing Pi payment:", error);
    throw new Error("Failed to complete Pi payment");
  }
};

export default {
  getPayment,
  completePayment,
};
