import { useEffect } from "react";

const PiNetworkPayment = ({ amount, memo, metadata }) => {
  useEffect(() => {
    const initiatePayment = async () => {
      if (!window.Pi) {
        console.error("Pi SDK not found");
        return;
      }

      const scopes = ["payments"];
      const appClientId = process.env.REACT_APP_PI_APP_CLIENT_ID;

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

          payment.onCancel((error) => {
            console.error("Payment canceled:", error);
          });

          payment.onError((error) => {
            console.error("Payment error:", error);
          });
        } catch (error) {
          console.error("Payment initiation error:", error);
        }
      });
    };

    initiatePayment();
  }, [amount, memo, metadata]);

  const approvePayment = async (paymentId) => {
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
    }
  };

  return null;
};

export default PiNetworkPayment;
