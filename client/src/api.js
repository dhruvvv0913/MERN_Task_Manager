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

// If the server ever says 401 (token missing/expired/invalid),
// log the user out and send them back to the login page.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
