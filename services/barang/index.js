import api from '../api';

export const getAllBarang = async (page, search) => {
  const res = await api.get(
    `barang/find-all?limit=20&offset=${page}&search=${search}`
  );
  return res.data;
};

export const getDetailBarang = async (id) => {
  const res = await api.get(`barang/find-by-id/${id}`);
  return res.data;
};

export const createBarang = async (data) => {
  const res = await api.post('/barang/create', data);
  return res.data;
};

export const deleteBarang = async (id) => {
  const res = await api.delete(`/barang/delete/${id}`);
  return res.data;
};

export const updateBarang = async (id, data) => {
  const res = await api.put(`/barang/update/${id}`, data);
  return res.data;
};
