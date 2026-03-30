import axios, { AxiosRequestConfig } from "axios";

interface SilentAxiosRequestConfig extends AxiosRequestConfig {
  _silent?: boolean;
}

const API_BASE_URL = "http://localhost:5000/sweet-rose";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config as SilentAxiosRequestConfig;

    if (error.response?.status === 401 && !config._silent) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;