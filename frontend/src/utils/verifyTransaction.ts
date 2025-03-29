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
import { getPiPayment, PiPayment } from "../services/piService";

/**
 * Verifies the status of a Pi transaction.
 * 
 * @param paymentId - The ID of the payment to verify.
 * @returns A promise that resolves to true if the transaction is completed, otherwise false.
 */
export const verifyPiTransaction = async (paymentId: string): Promise<boolean> => {
  try {
    // Fetch the payment information
    const payment: PiPayment | null = await getPiPayment(paymentId);

    // Validate the payment response
    if (!payment || typeof payment.status !== "string") {
      console.error("⚠️ Invalid response from Pi API");
      return false;
    }

    // Check if the payment status is completed
    return payment.status.toUpperCase() === "COMPLETED";
  } catch (error) {
    console.error("⚠️ Error verifying Pi transaction:", error);
    return false;
  }
};

import { verifyPiTransaction } from './verifyTransaction';
import { getPiPayment } from '../services/piService';

// Mock the getPiPayment function
jest.mock('../services/piService');
const mockedGetPiPayment = getPiPayment as jest.MockedFunction<typeof getPiPayment>;

describe('verifyPiTransaction', () => {
  it('should return true for a completed transaction', async () => {
    mockedGetPiPayment.mockResolvedValue({ status: 'COMPLETED' } as PiPayment);
    const result = await verifyPiTransaction('fakePaymentId');
    expect(result).toBe(true);
  });

  it('should return false for a non-completed transaction', async () => {
    mockedGetPiPayment.mockResolvedValue({ status: 'PENDING' } as PiPayment);
    const result = await verifyPiTransaction('fakePaymentId');
    expect(result).toBe(false);
  });

  it('should return false for an invalid response', async () => {
    mockedGetPiPayment.mockResolvedValue(null);
    const result = await verifyPiTransaction('fakePaymentId');
    expect(result).toBe(false);
  });

  it('should handle errors gracefully', async () => {
    mockedGetPiPayment.mockRejectedValue(new Error('API error'));
    const result = await verifyPiTransaction('fakePaymentId');
    expect(result).toBe(false);
  });
});
