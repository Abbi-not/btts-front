import api from "@/lib/api";

export interface Trip {
  id: number;
  bus: number;
  route: number;
  driver: number;
  departure_time: string;
  status?: string;
  // Expanded fields (may come from serializer)
  bus_detail?: { id: number; plate_number: string; capacity: number };
  route_detail?: { id: number; origin: string; destination: string };
}

export const tripService = {
  // Passenger
  passengerList: async (): Promise<Trip[]> => {
    const { data } = await api.get<Trip[]>("/passenger/trips/");
    return data;
  },
  passengerGet: async (id: number): Promise<Trip> => {
    const { data } = await api.get<Trip>(`/passenger/trips/${id}/`);
    return data;
  },

  // Driver
  driverList: async (): Promise<Trip[]> => {
    const { data } = await api.get<Trip[]>("/driver/trips/");
    return data;
  },
  driverGet: async (id: number): Promise<Trip> => {
    const { data } = await api.get<Trip>(`/driver/trips/${id}/`);
    return data;
  },
  driverUpdate: async (id: number, trip: Partial<Trip>): Promise<Trip> => {
    const { data } = await api.put<Trip>(`/driver/trips/${id}/`, trip);
    return data;
  },

  // Admin CRUD
  adminList: async (): Promise<Trip[]> => {
    const { data } = await api.get<Trip[]>("/admin/trips/");
    return data;
  },
  adminCreate: async (trip: Partial<Trip>): Promise<Trip> => {
    const { data } = await api.post<Trip>("/admin/trips/", trip);
    return data;
  },
  adminUpdate: async (id: number, trip: Partial<Trip>): Promise<Trip> => {
    const { data } = await api.put<Trip>(`/admin/trips/${id}/`, trip);
    return data;
  },
  adminDelete: async (id: number): Promise<void> => {
    await api.delete(`/admin/trips/${id}/`);
  },
};
