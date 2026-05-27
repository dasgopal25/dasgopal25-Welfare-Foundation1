import axiosInstance from '../services/axiosInstance';
export const submitContact = (data) => axiosInstance.post('/contact', data);
export const getMessages = (params) => axiosInstance.get('/contact', { params });
export const markAsRead = (id) => axiosInstance.put(`/contact/${id}/read`);
export const deleteMessage = (id) => axiosInstance.delete(`/contact/${id}`);
