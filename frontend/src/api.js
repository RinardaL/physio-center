import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const res = await api.post("/auth/refresh");

      localStorage.setItem("token", res.data.accessToken);

      originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;

      return api(originalRequest);
    }

    return Promise.reject(err);
  }
);

export default api;