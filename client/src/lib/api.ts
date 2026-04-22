import axios from 'axios';

/**
 * Central Axios instance.
 * - In development (Vite dev server) the proxy in vite.config.ts forwards /api → localhost:5000.
 * - In production VITE_API_URL is set to the Render backend URL.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  withCredentials: false,
});

// Attach JWT token from localStorage to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
