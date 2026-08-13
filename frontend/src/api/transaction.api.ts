import { Transaction } from '@/types/transaction';
import { api } from './axios';

export const transactionListApi = async () => {
  const { data } = await api.get<Transaction[]>('/transactions');
  return data;
};
