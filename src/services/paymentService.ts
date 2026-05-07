import api from "./api";

export interface PaymentResponse {
  id: string;
  ticket: string;
  amount: string;
  currency: string;
  provider: string;
  status: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  tx_ref: string;
  checkout_url: string;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
}

export const initializePayment = async (
  ticketId: string
): Promise<PaymentResponse> => {
  const response = await api.post(
    `/passenger/tickets/${ticketId}/pay/`,
    {
      return_url: `http://localhost:8080/payment-result?ticket=${ticketId}`,
    }
  );

  return response.data;
};

export const verifyPayment = async (
  ticketId: string
): Promise<PaymentResponse> => {
  const response = await api.post(
    `/passenger/tickets/${ticketId}/payment/verify/`
  );

  return response.data;
};

export const getPayment = async (
  ticketId: string
): Promise<PaymentResponse> => {
  const response = await api.get(
    `/passenger/tickets/${ticketId}/payment/`
  );

  return response.data;
};