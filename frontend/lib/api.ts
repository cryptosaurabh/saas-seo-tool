import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("sp_access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      const activeOrgId = localStorage.getItem("sp_active_org_id");
      if (activeOrgId) {
        config.headers["X-Organization-ID"] = activeOrgId;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      // Optional: Refresh token logic or redirect to login
      const isAuthPage = window.location.pathname.includes("/login") || window.location.pathname.includes("/signup");
      if (!isAuthPage) {
        localStorage.removeItem("sp_access_token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error.response?.data || error.message);
  }
);
