import api from "@/lib/api";

export interface Bus {
  id: number;
  plate_number: string;
  capacity: number;
  name?: string;
  status?: string;
}

export const busService = {
  // Public
  list: async (): Promise<Bus[]> => {
    const { data } = await api.get<Bus[]>("/buses/");
    return data;
  },

  // Admin CRUD
  adminList: async (): Promise<Bus[]> => {
    const { data } = await api.get<Bus[]>("/admin/buses/");
    return data;
  },
  adminCreate: async (bus: Partial<Bus>): Promise<Bus> => {
    const { data } = await api.post<Bus>("/admin/buses/", bus);
    return data;
  },
  adminUpdate: async (id: number, bus: Partial<Bus>): Promise<Bus> => {
    const { data } = await api.put<Bus>(`/admin/buses/${id}/`, bus);
    return data;
  },
  adminDelete: async (id: number): Promise<void> => {
    await api.delete(`/admin/buses/${id}/`);
  },
};
