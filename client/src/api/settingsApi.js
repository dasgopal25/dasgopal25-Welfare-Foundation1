import axiosInstance from '../services/axiosInstance';
export const getPublicSettings = () => axiosInstance.get('/settings');
export const adminGetSettings = () => axiosInstance.get('/admin/settings');
export const adminUpdateSettings = (data) => axiosInstance.put('/admin/settings/bulk', data);
export const getDashboardStats = () => axiosInstance.get('/admin/dashboard/stats');
