import axios, { AxiosError, AxiosRequestConfig } from "axios"

const API_BASE_URL = ""

const api = axios.create({
    baseURL:API_BASE_URL,
    headers:{
        "Content-Type":"application/json"
    },withCredentials:true
})



api.interceptors.request.use(
    (config) => {
        if (!config.headers["Content-Type"]) {
            config.headers["Content-Type"] = "application/json";
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api