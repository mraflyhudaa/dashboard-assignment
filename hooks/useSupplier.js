import { useAuth } from '@/context/auth';
import {
  createSupplier,
  deleteSupplier,
  getAllSupplier,
  getDetailSupplier,
  getSuplierDataList,
  updateSupplier,
} from '@/services/supplier';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const useSuppliers = (page, debouncedSearchValue) => {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: isAuthenticated ? ['supplier', page, debouncedSearchValue] : null,
    queryFn: () => getAllSupplier(page, debouncedSearchValue),
    keepPreviousData: true,
    enabled: !!isAuthenticated,
  });
};
const useSupplierList = (page, debouncedSearchValue, limit) => {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: isAuthenticated
      ? ['supplier', page, debouncedSearchValue, limit]
      : null,
    queryFn: () => getSuplierDataList(page, debouncedSearchValue, limit),
    keepPreviousData: true,
    enabled: !!isAuthenticated,
  });
};

const useViewSupplier = (id) => {
  return useQuery({
    queryKey: ['supplier', id],
    queryFn: () => getDetailSupplier(id),
    enabled: !!id,
    retry: false,
  });
};

const useCreateSupplier = (formData) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createSupplier(formData),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['supplier'],
      }),
  });
};

const useDeleteSupplier = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteSupplier(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['supplier'],
      });
      toast.success(`Supplier ID${id} berhasil dihapus!`);
    },
  });
};

const useUpdateSupplier = (id, formData) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => updateSupplier(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['supplier'],
      });
      toast.success(`Supplier ID${id} berhasil diedit!`);
    },
  });
};

export {
  useSuppliers,
  useViewSupplier,
  useCreateSupplier,
  useDeleteSupplier,
  useUpdateSupplier,
  useSupplierList,
};
