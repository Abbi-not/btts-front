import api from "@/lib/api";

export interface Seat {
  id: string;          // UUID from backend
  seat_number: number; // human readable
}

export const seatService = {
  listByBus: async (busId: string): Promise<Seat[]> => {
    const { data } = await api.get<Seat[]>(`/buses/${busId}/seats/`);
    return data;
  },
};