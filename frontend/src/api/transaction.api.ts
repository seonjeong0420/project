import { Transaction, TransactionCreate, TransactionList } from '@/types/transaction';
import { api } from './axios';

export const transactionListApi = async () => {
  const { data } = await api.get<TransactionList[]>('/transactions');
  return data;
};

export const transactionCreateApi = async (body: TransactionCreate) => {
  const { data } = await api.post<TransactionCreate>('/transactions', body);
  return data;
};

export const transactionUpdateApi = async (id: string, data: TransactionCreate) => {
  const { data: response } = await api.patch<TransactionCreate>(`/transactions/${id}`, data);
  return response;
};

export const transactionDeleteApi = async (id: string) => {
  const { data } = await api.delete<Transaction>(`/transactions/${id}`);
  return data;
};

export const transactionDetailApi = async (id: string) => {
  const { data } = await api.get<TransactionList>(`/transactions/${id}`);
  return data;
};
