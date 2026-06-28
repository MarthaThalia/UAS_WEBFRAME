import api from './axios';

// ==================== AUTH ====================
export const login = (email, password) =>
  api.post('/login', { email, password });

export const register = (data) =>
  api.post('/register', data);

export const logout = () =>
  api.post('/logout');

export const getMe = () =>
  api.get('/me');

// ==================== PONDS ====================
export const getPonds = () =>
  api.get('/ponds');

export const createPond = (data) =>
  api.post('/ponds', data);

export const updatePond = (id, data) =>
  api.put(`/ponds/${id}`, data);

export const deletePond = (id) =>
  api.delete(`/ponds/${id}`);

// ==================== SENSOR READINGS ====================
export const getSensorReadings = () =>
  api.get('/sensor-readings');

export const createSensorReading = (data) =>
  api.post('/sensor-readings', data);

export const getSensorReading = (id) =>
  api.get(`/sensor-readings/${id}`);

export const deleteSensorReading = (id) =>
  api.delete(`/sensor-readings/${id}`);

// ==================== FEED LOGS ====================
export const getFeedLogs = () =>
  api.get('/feed-logs');

export const createFeedLog = (data) =>
  api.post('/feed-logs', data);
