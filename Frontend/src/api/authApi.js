import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = async (userData) => {
  const response = await api.post('/api/users', userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post('/api/users/login', credentials);
  return response.data;
};
