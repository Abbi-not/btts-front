import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ticketService } from "@/services/ticketService";

const PaymentResult = () => {
  const [params] = useSearchParams();
  const ticketId = params.get("ticket_id");

  const [status, setStatus] = useState("VERIFYING");

  useEffect(() => {
    if (!ticketId) return;

    let attempts = 0;

    const interval = setInterval(async () => {
      try {
        const res = await ticketService.verifyPayment(ticketId);

        const s = res.data.status;

        if (s === "PAID" || s === "FAILED") {
          setStatus(s);
          clearInterval(interval);
        }
      } catch (err) {
        console.log(err);
      }

      attempts++;
      if (attempts > 12) {
        clearInterval(interval);
        setStatus("TIMEOUT");
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [ticketId]);

  return (
    <div className="text-center py-20">
      <h1 className="text-2xl font-bold mb-4">Payment Status</h1>

      {status === "VERIFYING" && <p>Checking payment...</p>}
      {status === "PAID" && <p className="text-green-600">Payment successful</p>}
      {status === "FAILED" && <p className="text-red-600">Payment failed</p>}
      {status === "TIMEOUT" && <p>Verification timeout. Refresh.</p>}
    </div>
  );
};

export default PaymentResult;