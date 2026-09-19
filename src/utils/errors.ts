import axios from "axios";

export class ApiError extends Error {
  status: number;
  errors?: Record<string, string>;

  constructor(
    message: string,
    status: number = 500,
    errors?: Record<string, string>
  ) {
    super(message);
    this.status = status;
    this.errors = errors; 
    this.name = "ApiError";

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof ApiError) {
    return error.message || fallback;
  }

  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? error.message ?? fallback;
  }

  return error instanceof Error ? error.message : fallback;
};
