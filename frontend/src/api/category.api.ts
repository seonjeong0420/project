import { Category } from '@/types/category';
import { api } from './axios';

export const categoryApi = async (body: Category) => {
  const { data } = await api.post<Category>('/categories', body);
  return data;
};

export const categoryListApi = async () => {
  const { data } = await api.get<Category[]>('/categories');
  return data;
};
