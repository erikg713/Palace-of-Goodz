import { Pi } from "pi-sdk";
import dotenv from "dotenv";

dotenv.config();

Pi.init({
  version: "2.0",
  sandbox: process.env.PI_SANDBOX === "true",
});

export const getPiPayment = async (paymentId) => {
  return await Pi.getPayment(paymentId);
};
