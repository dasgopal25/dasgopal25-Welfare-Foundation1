import axios from 'axios';

// In production: VITE_API_URL = your Vercel backend URL
// In development: vite proxy handles /api → localhost:5000
const baseURL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';

const axiosInstance = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
