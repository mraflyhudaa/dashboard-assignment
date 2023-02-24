import { useAuth } from '@/context/auth';
import {
  createBarang,
  deleteBarang,
  getAllBarang,
  getDetailBarang,
  updateBarang,
} from '@/services/barang';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const useBarang = (page, debouncedSearchValue) => {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: isAuthenticated ? ['barang', page, debouncedSearchValue] : null,
    queryFn: () => getAllBarang(page, debouncedSearchValue),
    keepPreviousData: true,
    enabled: !!isAuthenticated,
  });
};

const useViewBarang = (id) => {
  return useQuery({
    queryKey: ['barang', id],
    queryFn: () => getDetailBarang(id),
    enabled: !!userId,
    retry: false,
  });
};

const useCreateBarang = (formData) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createBarang(formData),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['barang'],
      }),
  });
};

const useDeleteBarang = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteBarang(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['barang'],
      });
      toast.success(`Barang ID${id} berhasil dihapus!`);
    },
  });
};

const useUpdateBarang = (id, formData) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => updateBarang(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['barang'],
      });
      toast.success(`Barang ID${id} berhasil diedit!`);
    },
  });
};

export {
  useBarang,
  useViewBarang,
  useCreateBarang,
  useDeleteBarang,
  useUpdateBarang,
};
