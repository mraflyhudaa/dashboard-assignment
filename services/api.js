import axios from 'axios';

const api = axios.create({
  baseURL: 'http://159.223.57.121:8090/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

let authInterceptorID;
export const authenticateAPI = (token) => {
  authInterceptorID = api.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${token}`;
    return config;
  });
};

export const unauthenticateAPI = () => {
  api.interceptors.request.eject(authInterceptorID);
};

export default api;
