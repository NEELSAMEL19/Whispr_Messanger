export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role?: string;
}

export interface User extends AuthUser {
  auth?: {
    role?: string;
  };
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export type RegisterFormData = RegisterPayload;
export type LoginFormData = LoginPayload;