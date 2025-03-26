import { Pi } from "pi-sdk";
import dotenv from "dotenv";

dotenv.config();

Pi.init({
  version: "2.0",
  sandbox: process.env.PI_SANDBOX === "true",
});

export interface PiPayment {
  status: string;
  [key: string]: any; // Allow additional fields if needed
}

export const getPiPayment = async (paymentId: string): Promise<PiPayment | null> => {
  try {
    const payment = await Pi.getPayment(paymentId);
    return payment;
  } catch (error) {
    console.error("Error fetching Pi payment:", error);
    return null;
  }
};
