import axiosInstance from '../services/axiosInstance';
export const getPublicGallery = (params) => axiosInstance.get('/settings/gallery', { params });
export const adminGetGallery = () => axiosInstance.get('/admin/gallery');
export const adminAddImage = (data) => axiosInstance.post('/admin/gallery', data, { headers: { 'Content-Type': 'multipart/form-data' } });
export const adminUpdateImage = (id, data) => axiosInstance.put(`/admin/gallery/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
export const adminDeleteImage = (id) => axiosInstance.delete(`/admin/gallery/${id}`);
