import axios from 'axios';

export const login = async (credentials) => {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, credentials);
  return response.token;
};

export const signup = async (userData) => {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, userData);
  return response.data;
};
