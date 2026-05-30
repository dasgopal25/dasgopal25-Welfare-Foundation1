import axiosInstance from '../services/axiosInstance';
export const getPublicVideos  = (params) => axiosInstance.get('/videos', { params });
export const adminGetVideos   = ()        => axiosInstance.get('/admin/videos');
export const adminCreateVideo = (data)    => axiosInstance.post('/admin/videos', data);
export const adminUpdateVideo = (id, d)   => axiosInstance.put(`/admin/videos/${id}`, d);
export const adminDeleteVideo = (id)      => axiosInstance.delete(`/admin/videos/${id}`);