import api from './api';

export const getLogs = (page = 1) => api.get(`/hifz/logs?page=${page}`).then(r => r.data);
export const createLog = (data) => api.post('/hifz/logs', data).then(r => r.data);
export const updateLog = (id, data) => api.put(`/hifz/logs/${id}`, data).then(r => r.data);
export const deleteLog = (id) => api.delete(`/hifz/logs/${id}`);
export const getMistakes = (params = {}) => api.get('/mistakes', { params }).then(r => r.data);
export const createMistake = (data) => api.post('/mistakes', data).then(r => r.data);
export const resolveMistake = (id) => api.put(`/mistakes/${id}/resolve`).then(r => r.data);
export const getProgress = () => api.get('/progress').then(r => r.data);
export const updateProgress = (surahNum, data) => api.put(`/progress/${surahNum}`, data).then(r => r.data);
export const getStreak = () => api.get('/progress/streak').then(r => r.data);
