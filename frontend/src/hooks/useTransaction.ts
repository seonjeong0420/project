import { useQuery } from '@tanstack/react-query';
import { transactionListApi } from '@/api/transaction.api';

export const useTransactionList = () => {
  return useQuery({
    queryKey: ['transctions'],
    queryFn: transactionListApi,
  });
};
