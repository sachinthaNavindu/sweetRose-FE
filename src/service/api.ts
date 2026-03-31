import axios, { AxiosError, AxiosRequestConfig } from "axios";

export interface SilentAxiosRequestConfig extends AxiosRequestConfig {
  _silent?: boolean;
  _retry?: boolean;
}

const API_BASE_URL = "http://localhost:5000/sweet-rose";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.post("/token/refresh-token", {}, { withCredentials: true });

        return api({ ...originalRequest, withCredentials: true });
      } catch (refreshError) {
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
