import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllAppointments = async () => {
  const response = await api.get('/api/appointments');
  return response.data;
};

export const getAppointmentById = async (id) => {
  const response = await api.get(`/api/appointments/${id}`);
  return response.data;
};

export const createAppointment = async (appointmentData) => {
  const response = await api.post('/api/appointments', appointmentData);
  return response.data;
};

export const getAppointmentsByPatient = async (patientId) => {
  const response = await api.get(`/api/appointments/patient/${patientId}`);
  return response.data;
};

export const getAppointmentsByDoctor = async (doctorId) => {
  const response = await api.get(`/api/appointments/doctor/${doctorId}`);
  return response.data;
};

export const updateAppointmentStatus = async (id, statusData) => {
  const response = await api.put(`/api/appointments/${id}/status`, statusData);
  return response.data;
};

export const deleteAppointment = async (id) => {
  const response = await api.delete(`/api/appointments/${id}`);
  return response.data;
};
