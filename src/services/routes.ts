export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3030";

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    ME: "/api/auth/profile",
    LOGOUT: "/api/auth/logout",
  },
};
