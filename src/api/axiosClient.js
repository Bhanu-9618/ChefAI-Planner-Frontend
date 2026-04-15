import axios from "axios";

// Read the BASE URL from .env.local (defaults to localhost if not found)
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Automatically attach JWT token to every request
axiosClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("chefai_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle global errors (like 401 Unauthorized)
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token is invalid or expired
      console.error("Token expired or invalid. Logging out...");
      sessionStorage.removeItem("chefai_token");
      
      // If we are not already on the signin page, redirect
      if (window.location.pathname !== "/signin") {
        window.location.href = "/signin";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
