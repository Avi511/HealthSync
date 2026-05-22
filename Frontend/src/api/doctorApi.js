import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllDoctors = async () => {
  const response = await api.get('/api/doctors');
  return response.data;
};

export const createDoctor = async (doctorData) => {
  const response = await api.post('/api/doctors', doctorData);
  return response.data;
};

export const updateDoctor = async (id, doctorData) => {
  const response = await api.put(`/api/doctors/${id}`, doctorData);
  return response.data;
};

export const deleteDoctor = async (id) => {
  const response = await api.delete(`/api/doctors/${id}`);
  return response.data;
};
