import {
  CalendarTransactionSummary,
  Transaction,
  TransactionCreate,
  TransactionListParams,
  TransactionListResponse,
} from '@/types/transaction';
import { api } from './axios';

export const transactionListApi = async (params?: TransactionListParams) => {
  const { data } = await api.get<TransactionListResponse>('/transactions', {
    params,
  });

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
  const { data } = await api.get<Transaction>(`/transactions/${id}`);
  return data;
};

export const transactionCalendarApi = async (year: number, month: number) => {
  const { data } = await api.get<CalendarTransactionSummary[]>('/transactions/calendar', {
    params: {
      year,
      month,
    },
  });
  return data;
};

export const transactionDateApi = async (date: string) => {
  const { data } = await api.get<Transaction[]>(`/transactions/date/${date}`);
  return data;
};
