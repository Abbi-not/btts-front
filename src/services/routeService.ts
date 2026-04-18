import api from "@/lib/api";

export interface BusRoute {
  id: number;
  origin: string;
  destination: string;
}

export const routeService = {
  adminList: async (): Promise<BusRoute[]> => {
    const { data } = await api.get<BusRoute[]>("/admin/routes/");
    return data;
  },
  adminCreate: async (route: Partial<BusRoute>): Promise<BusRoute> => {
    const { data } = await api.post<BusRoute>("/admin/routes/", route);
    return data;
  },
  adminUpdate: async (id: number, route: Partial<BusRoute>): Promise<BusRoute> => {
    const { data } = await api.put<BusRoute>(`/admin/routes/${id}/`, route);
    return data;
  },
  adminDelete: async (id: number): Promise<void> => {
    await api.delete(`/admin/routes/${id}/`);
  },
};
