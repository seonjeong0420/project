import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { categoryApi, categoryDeleteApi, categoryListApi } from '@/api/category.api';

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
