import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { transactionCreateApi, transactionListApi } from '@/api/transaction.api';

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
