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

export const verifyOtp = async (email, otp) => {
  const response = await api.post('/api/users/verify-otp', { email, otp });
  return response.data;
};

export const resendOtp = async (email) => {
  const response = await api.post('/api/users/resend-otp', { email });
  return response.data;
};

export const googleLoginUser = async (tokenId) => {
  const response = await api.post('/api/users/auth/google', { tokenId });
  return response.data;
};
