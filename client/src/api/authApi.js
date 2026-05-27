import axiosInstance from '../services/axiosInstance';
export const loginAdmin = (data) => axiosInstance.post('/admin/auth/login', data);
export const getProfile = () => axiosInstance.get('/admin/auth/profile');
export const updateProfile = (data) => axiosInstance.put('/admin/auth/profile', data);
