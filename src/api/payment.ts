import axios from "axios";

export async function initiatePayment(ticketId: string) {
  const res = await axios.post(`/api/passenger/tickets/${ticketId}/pay/`);
  return res.data; // { checkout_url }
}

export async function verifyPayment(ticketId: string) {
  const res = await axios.post(`/api/passenger/tickets/${ticketId}/payment/verify/`);
  return res.data; // { status }
}