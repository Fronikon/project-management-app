import axios from 'axios';
import tokenEvent from '../utils/tokenEvent';
import TokenService from './tokenApi';

export const instance = axios.create({
  baseURL: 'https://pma-backend.onrender.com/',
});

instance.interceptors.request.use(
  async (config) => {
    const token = TokenService.getToken();

    if (token) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 403) {
      tokenEvent.dispatch();
    }
    return Promise.reject(error);
  }
);
