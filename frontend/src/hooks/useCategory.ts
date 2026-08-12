import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import {
  categoryApi,
  categoryDeleteApi,
  categoryListApi,
  categoryUpdateApi,
} from '@/api/category.api';
import { CategoryFormValues } from '@/types/category';

export const useCategoryCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: categoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useCategoryList = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: categoryListApi,
  });
};

export const useCategoryDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: categoryDeleteApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: error => {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message ?? '카테고리 삭제에 실패했습니다.';

        alert(message);
      }
    },
  });
};

export const useCategoryUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CategoryFormValues }) =>
      categoryUpdateApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};
