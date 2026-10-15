import axios from 'axios';
import { pegarToken } from './storage';

const api = axios.create({
  baseURL: 'https://arremessando-alto-tcc.up.railway.app',
});

api.interceptors.request.use(async (config) => {
  try {
    const token = await pegarToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {}
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;