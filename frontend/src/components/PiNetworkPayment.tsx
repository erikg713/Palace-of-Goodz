import { useEffect } from "react";

interface PiNetworkPaymentProps {
  amount: number;
  memo: string;
  metadata: Record<string, any>; // More specific type for metadata
}

const PiNetworkPayment: React.FC<PiNetworkPaymentProps> = ({ amount, memo, metadata }) => {
  // Check environment variables once
  const appClientId = process.env.REACT_APP_PI_APP_CLIENT_ID;
  if (!appClientId) {
    console.error("Missing Pi App Client ID");
    return <div>Error: Missing configuration</div>;
  }

  useEffect(() => {
    const initiatePayment = async () => {
      if (!window.Pi) {
        console.error("Pi SDK not found");
        return;
      }

      const scopes = ["payments"];

      window.Pi.authenticate(scopes, appClientId, async (authResult) => {
        if (!authResult) {
          console.error("Authentication failed");
          return;
        }

        try {
          const payment = await window.Pi.createPayment({
            amount,
            memo,
            metadata,
          });

          payment.onReadyForServerApproval((paymentId) => {
            console.log("Payment ID:", paymentId);
            approvePayment(paymentId);
          });

          payment.onReadyForServerCompletion((paymentId) => {
            console.log("Payment Ready for Completion:", paymentId);
          });

          payment.onCancel(handlePaymentError);
          payment.onError(handlePaymentError);
        } catch (error) {
          handlePaymentError(error);
        }
      });
    };

    const handlePaymentError = (error: any) => {
      console.error("Payment error:", error);
      // Optionally add user feedback here
    };

    initiatePayment();
  }, [amount, memo, metadata, appClientId]);

  const approvePayment = async (paymentId: string) => {
    try {
      const response = await fetch("http://localhost:5000/api/approve-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentId }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Payment approved:", data);
    } catch (error) {
      console.error("Error approving payment:", error);
      // Optionally add user feedback here
    }
  };

  return <div>Processing Payment...</div>; // Provide user feedback
};

export default PiNetworkPayment;
