export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  "https://whispr-messanger-backend.onrender.com";

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    ME: "/api/auth/profile",
    LOGOUT: "/api/auth/logout",
    USERS: "/api/auth/users",
  },
  MESSAGES: {
    CONVERSATIONS: "/api/messages/conversations",
    CONVERSATION: (userId: string) => `/api/messages/${userId}`,
    READ: (userId: string) => `/api/messages/${userId}/read`,
    MESSAGE: (messageId: string) => `/api/messages/message/${messageId}`,
  },
};
