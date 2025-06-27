import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      originalRequest.url.includes("/auth/login") ||
      originalRequest.url.includes("/auth/register")
    ) {
      return Promise.reject(error);
    }

    // Handle expired token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.get("http://localhost:3000/api/auth/refresh-token", {
          withCredentials: true,
        });
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token invalid or expired.");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
