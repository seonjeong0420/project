import { useMutation, useQuery } from '@tanstack/react-query';
import { categoryApi, categoryListApi } from '@/api/category.api';

export const useCategoryCreate = () => {
  return useMutation({
    mutationFn: categoryApi,
  });
};

export const useCategoryList = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: categoryListApi,
  });
};
