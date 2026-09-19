import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../services/auth";
import type { LoginPayload, RegisterPayload, User } from "../../types/auth";

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

interface AuthState {
  user: User | null;
  status: AuthStatus;
}

const initialState: AuthState = {
  user: null,
  status: "loading",
};

export const loadCurrentUser = createAsyncThunk("auth/loadCurrentUser", async () => {
  try {
    const response = await authApi.me();
    return response.data;
  } catch {
    return null;
  }
});

export const login = createAsyncThunk("auth/login", async (payload: LoginPayload) => {
  const response = await authApi.login(payload);
  return response.data;
});

export const register = createAsyncThunk("auth/register", async (payload: RegisterPayload) => {
  const response = await authApi.register(payload);
  return response.data;
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    await authApi.logout();
  } catch {
    // The local session must still be cleared if the server request fails.
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.user = null;
      state.status = "unauthenticated";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCurrentUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = action.payload ? "authenticated" : "unauthenticated";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "authenticated";
      })
      .addCase(login.rejected, (state) => {
        state.status = "unauthenticated";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "authenticated";
      })
      .addCase(register.rejected, (state) => {
        state.status = "unauthenticated";
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.status = "unauthenticated";
      });
  },
});

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;
