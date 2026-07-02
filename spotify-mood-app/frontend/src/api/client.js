import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || `http://${window.location.hostname}:3001`;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function checkHealth() {
  const { data } = await apiClient.get('/api/health');
  return data;
}

export function getLoginUrl() {
  return `${API_BASE_URL}/api/auth/login`;
}

export async function fetchCurrentUser() {
  const { data } = await apiClient.get('/api/auth/me');
  return data;
}

export async function logoutUser() {
  const { data } = await apiClient.post('/api/auth/logout');
  return data;
}
