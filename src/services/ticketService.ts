import api from "@/lib/api";

export interface Ticket {
  id: string;
  trip: string;
  seat: number;
  status?: string;

  route_label?: string;
  bus_plate_number?: string;
  departure_time?: string;
  booked_at?: string;
}

export const ticketService = {
  list: async (): Promise<Ticket[]> => {
    const { data } = await api.get("/passenger/tickets/");
    return data;
  },

  get: async (id: string): Promise<Ticket> => {
    const { data } = await api.get(`/passenger/tickets/${id}/`);
    return data;
  },

  create: async (payload: { trip_id: string; seat_id: number }) => {
    const { data } = await api.post("/passenger/tickets/", payload);
    return data;
  },

  cancel: async (id: string) => {
    const { data } = await api.patch(`/passenger/tickets/${id}/cancel/`);
    return data;
  },

  pay: (ticketId: string) =>
    api.post(`/passenger/tickets/${ticketId}/pay/`),

  verifyPayment: (ticketId: string) =>
    api.post(`/passenger/tickets/${ticketId}/payment/verify/`),
};