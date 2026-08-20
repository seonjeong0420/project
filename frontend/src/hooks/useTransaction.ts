import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  transactionCreateApi,
  transactionDetailApi,
  transactionListApi,
  transactionUpdateApi,
} from '@/api/transaction.api';
import { TransactionCreate } from '@/types/transaction';

export const useTransactionList = () => {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: transactionListApi,
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

export const useTransactionDetail = (id: string) => {
  return useQuery({
    queryKey: ['transactionDetail', id],
    queryFn: () => transactionDetailApi(id),
  });
};
