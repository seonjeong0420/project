import { TransactionCreate, TransactionList } from '@/types/transaction';
import { api } from './axios';

export const transactionListApi = async () => {
  const { data } = await api.get<TransactionList[]>('/transactions');
  return data;
};

export const transactionCreateApi = async (body: TransactionCreate) => {
  const { data } = await api.post<TransactionCreate>('/transactions', body);
  return data;
};
