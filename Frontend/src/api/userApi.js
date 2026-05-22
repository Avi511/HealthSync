import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllUsers = async () => {
  const response = await api.get('/api/users');
  return response.data;
};

export const getUserById = async (id) => {
  const response = await api.get(`/api/users/${id}`);
  return response.data;
};

export const createUser = async (userData) => {
  const response = await api.post('/api/users', userData);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await api.put(`/api/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/api/users/${id}`);
  return response.data;
};
