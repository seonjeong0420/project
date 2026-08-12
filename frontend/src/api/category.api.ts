import { Category, CategoryFormValues } from '@/types/category';
import { api } from './axios';

export const categoryApi = async (body: CategoryFormValues) => {
  const { data } = await api.post<CategoryFormValues>('/categories', body);
  return data;
};

export const categoryListApi = async () => {
  const { data } = await api.get<Category[]>('/categories');
  return data;
};

export const categoryDeleteApi = async (id: string) => {
  const { data } = await api.delete<Category>(`/categories/${id}`);
  return data;
};

export const categoryUpdateApi = async (id: string, data: CategoryFormValues) => {
  const { data: response } = await api.patch<Category>(`/categories/${id}`, data);
  return response;
};
