import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("smart-medicine-finder.token");

    if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }
  }

  return config;
});

export default api;