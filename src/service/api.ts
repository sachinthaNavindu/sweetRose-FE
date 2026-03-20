import axios, { AxiosError, AxiosRequestConfig } from "axios"

const API_BASE_URL = ""

const api = axios.create({
    baseURL:API_BASE_URL,
    headers:{
        "Content-Type":"application/json"
    }
})


export const getAccessToken = (): string | null =>{
    return localStorage.getItem("accessToken")
}

export const getRefreshToken = (): string | null =>{
    return localStorage.getItem("refreshToken")
}

export const setToken = (accessToken: string, refreshToken: string):void=>{
    localStorage.setItem("accessToken",accessToken)
    localStorage.setItem("refreshToken",refreshToken)
}

export const clearTokens = (): void=>{
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
}

api.interceptors.request.use(
    (config)=>{
        const token = getAccessToken()
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        if(!config.headers["Content-Type"]){
            config.headers["Content-Type"] = "application/json"
        }
        return config
    },
    (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (!error.config) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        clearTokens();
        return Promise.reject(error);
      }
      try {
        const res = await api.post(
          "/auth/refreshToken",
          { refreshToken }
        );

        const { accessToken, refreshToken: newRefreshToken } = res.data;

        setToken(accessToken, newRefreshToken);

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${accessToken}`,
        };

        return api(originalRequest);
      } catch (err) {
        clearTokens();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api