import api from '../api';

export const getAllSupplier = async (page, search) => {
  const res = await api.get(
    `supplier/find-all?limit=20&offset=${page}&search=${search}`
  );
  return res.data;
};
export const getSuplierDataList = async (page, search, limit) => {
  const res = await api.get(
    `supplier/find-all?limit=${limit}&offset=${page}&search=${search}`
  );
  return res.data;
};

export const getDetailSupplier = async (id) => {
  const res = await api.get(`supplier/find-by-id/${id}`);
  return res.data;
};

export const createSupplier = async (data) => {
  const res = await api.post('/supplier/create', data);
  return res.data;
};

export const deleteSupplier = async (id) => {
  const res = await api.delete(`/supplier/delete/${id}`);
  return res.data;
};

export const updateSupplier = async (id, data) => {
  const res = await api.put(`/supplier/update/${id}`, data);
  return res.data;
};
