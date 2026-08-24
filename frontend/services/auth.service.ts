import { apiClient } from "@/lib/api";

export interface RegisterPayload {
  email: string;
  password: string;
  full_name: string;
  organization_name: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const authService = {
  async register(payload: RegisterPayload) {
    return apiClient.post("/auth/register", payload);
  },

  async login(payload: LoginPayload) {
    return apiClient.post("/auth/login", payload);
  },

  async refreshToken(refreshToken: string) {
    return apiClient.post("/auth/refresh", { refresh_token: refreshToken });
  },

  async forgotPassword(email: string) {
    return apiClient.post("/auth/forgot-password", { email });
  },

  async resetPassword(token: string, newPassword: string) {
    return apiClient.post("/auth/reset-password", { token, new_password: newPassword });
  }
};
