import axios from "axios";

// One axios instance for the whole app, pointed at our backend API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Before every request, attach the saved token (if the user is logged in)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
