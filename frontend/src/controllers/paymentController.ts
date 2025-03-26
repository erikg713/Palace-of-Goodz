import { Request, Response } from "express";
import { processPaymentVerification } from "../services/paymentService";

export const verifyPayment = async (req: Request, res: Response): Promise<Response> => {
  const { paymentId } = req.body;

  if (!paymentId) {
    return res.status(400).json({ error: "Missing paymentId" });
  }

  const isValid = await processPaymentVerification(paymentId);
  return res.json({ verified: isValid });
};
