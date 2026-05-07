// src/pages/PaymentResult.tsx

import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { verifyPayment } from "../../services/paymentService";

type PaymentState =
  | "VERIFYING"
  | "PAID"
  | "FAILED"
  | "TIMEOUT";

const PaymentResult = () => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const ticketId = searchParams.get("ticket");

  const [status, setStatus] =
    useState<PaymentState>("VERIFYING");

  const [message, setMessage] = useState(
    "Verifying payment..."
  );

  useEffect(() => {
    if (!ticketId) {
      setStatus("FAILED");
      setMessage("Missing ticket ID.");
      return;
    }

    let attempts = 0;

    const interval = setInterval(async () => {
      try {
        attempts++;

        const payment = await verifyPayment(ticketId);

        if (payment.status === "PAID") {
          setStatus("PAID");
          setMessage("Payment successful.");

          clearInterval(interval);
          return;
        }

        if (payment.status === "FAILED") {
          setStatus("FAILED");
          setMessage("Payment failed.");

          clearInterval(interval);
          return;
        }

        if (attempts >= 12) {
          setStatus("TIMEOUT");
          setMessage("Verification timed out.");

          clearInterval(interval);
        }
      } catch (error) {
        console.error(error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [ticketId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">
          Payment Status
        </h1>

        <p className="text-gray-700 mb-6">
          {message}
        </p>

        {status === "PAID" && (
          <button
            onClick={() => navigate("/my-tickets")}
            className="bg-green-600 text-white px-5 py-2 rounded-lg"
          >
            Go To Tickets
          </button>
        )}

        {(status === "FAILED" ||
          status === "TIMEOUT") && (
          <button
            onClick={() => navigate("/")}
            className="bg-red-600 text-white px-5 py-2 rounded-lg"
          >
            Return Home
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentResult;