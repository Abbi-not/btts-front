import api from "@/lib/api";

export interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: "ADMIN" | "DRIVER" | "PASSENGER";
}

const mapRole = (role: string) => {
  if (role === "driver") return "DRIVER";
  if (role === "admin") return "ADMIN";
  return "PASSENGER";
};

export const authService = {
  // ✅ LOGIN
  login: async (email: string, password: string) => {
    const { data } = await api.post<LoginResponse>("/auth/login/", {
      email,
      password,
    });

    localStorage.setItem("btts_access", data.access);
    localStorage.setItem("btts_refresh", data.refresh);
    localStorage.setItem("btts_user", JSON.stringify(data.user));

    return { tokens: data, user: data.user };
  },

  // ✅ REGISTER
  register: async (
    username: string,
    email: string,
    password: string,
    role: string
  ) => {
    await api.post("/auth/register/", {
      username,
      email,
      password,
      first_name: username,
      last_name: "User",
      role: mapRole(role),
    });

    // auto-login
    return authService.login(email, password);
  },

  // 🔥 FIXED (was wrong)
  getMe: async () => {
    const { data } = await api.get("/auth/me/");
    return data;
  },

  logout: () => {
    localStorage.clear();
  },

  // 🔥 FIXED (paths were wrong)
  isAdmin: async () => {
    try {
      await api.get("/auth/admin-check/");
      return true;
    } catch {
      return false;
    }
  },

  isDriver: async () => {
    try {
      await api.get("/auth/driver-check/");
      return true;
    } catch {
      return false;
    }
  },
};