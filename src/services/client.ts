import axios, { type AxiosInstance } from "axios";
import { API_BASE_URL } from "./routes";
import { ApiError } from "../utils/errors";

export type ApiClient = AxiosInstance;

export const apiClient: ApiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 15000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (
      typeof window !== "undefined" &&
      axios.isAxiosError(error) &&
      error.response?.status === 401
    ) {
      window.dispatchEvent(new Event("auth:unauthorized"));
    }

    if (axios.isAxiosError<{ message?: string; errors?: Record<string, string> }>(error)) {
      const message = error.response?.data?.message ?? error.message;
      const status = error.response?.status ?? 500;

      return Promise.reject(
        new ApiError(message, status, error.response?.data?.errors),
      );
    }

    return Promise.reject(error);
  },
);