import axios, { type AxiosInstance } from "axios";
import { API_BASE_URL } from "./routes";

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

    return Promise.reject(error);
  },
);

export const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? error.message ?? fallback;
  }

  return error instanceof Error ? error.message : fallback;
};