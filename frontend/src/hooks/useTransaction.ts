import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  transactionCreateApi,
  transactionDeleteApi,
  transactionDetailApi,
  transactionListApi,
  transactionUpdateApi,
} from '@/api/transaction.api';
import { TransactionCreate, TransactionListParams } from '@/types/transaction';

export const useTransactionList = (params: TransactionListParams = {}) => {
  return useQuery({
    queryKey: ['transactions', params],
    queryFn: () => transactionListApi(params),
  });
};

export const useTransactionCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['transactionCreate'],
    mutationFn: transactionCreateApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
};

export const useTransactionUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['transactionUpdate'],
    mutationFn: ({ id, data }: { id: string; data: TransactionCreate }) =>
      transactionUpdateApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
};

export const useTransactionDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['transactionDelete'],
    mutationFn: transactionDeleteApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
};

export const useTransactionDetail = (id: string) => {
  return useQuery({
    queryKey: ['transactionDetail', id],
    queryFn: () => transactionDetailApi(id),
  });
};
