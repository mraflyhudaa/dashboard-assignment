import api from './api';

export const login = async (data) => {
  const res = await api.post('auth/login', data);
  return res.data;
};
export const register = async (data) => {
  const res = await api.post('auth/register', data);
  return res.data;
};

export const getUser = async (username) => {
  const res = await api.get(`users/find-by-username?username=${username}`);
  return res.data;
};
