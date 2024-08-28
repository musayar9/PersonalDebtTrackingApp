import axios, { AxiosInstance } from "axios";

// API instance oluştur
const api: AxiosInstance = axios.create({
  baseURL: "/api",
});

// Request interceptor: Access token'ı istek başlığına ekle
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Access token süresi dolduğunda refresh token kullanarak yenile
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await api.post("/v1/auth/refresh-token");

        localStorage.setItem("token", data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.accessToken}`;

        return api(originalRequest); // Yeniden isteği gönder
      } catch (err) {
        console.error("Refresh token failed", err);
        // Kullanıcıyı yeniden giriş sayfasına yönlendirme işlemi yapılabilir
      }
    }

    return Promise.reject(error);
  }
);

export default api;
