'use client';
import Link from 'next/link';
import Pagination from '@/components/ui/Pagination';
import { categoryTypeLabel } from '@/constants/transaction';
import { useCategoryList } from '@/hooks/useCategory';
import { useTransactionDelete, useTransactionList } from '@/hooks/useTransaction';
import { Transaction, TransactionListParams } from '@/types/transaction';

type Props = {
  params: TransactionListParams;
  onEdit: (item: Transaction) => void;
  onChange: (params: TransactionListParams) => void;
};
const TransactionList = ({ params, onEdit, onChange }: Props) => {
  const { data, isPending } = useTransactionList(params);
  const transactionDelete = useTransactionDelete();
  const { data: category = [] } = useCategoryList();
  const categoryMap = new Map(category.map(item => [item.id, item.name]));
  const handleDeleteTransaction = (id: string) => {
    transactionDelete.mutate(id);
  };

  const handleChangePage = (page: number) => {
    onChange({ ...params, page });
  };

  if (isPending) {
    return <p>내역을 불러오는 중...</p>;
  }

  return (
    <section>
      <ul>
        {data?.data.map(item => {
          return (
            <li key={item.id}>
              <Link href={`/transactions/detail/${item.id}`}>
                <span>{item.title}</span>
                <span>{categoryTypeLabel[item.type]}</span>
                <span>{categoryMap.get(item.categoryId) ?? '카테고리 없음'}</span>
                <span>{item.memo}</span>
                <span>{item.amount}</span>
                <span>{item.date}</span>
              </Link>
              <button type="button" onClick={() => onEdit(item)}>
                내역 수정
              </button>
              <button type="button" onClick={() => handleDeleteTransaction(item.id)}>
                삭제
              </button>
            </li>
          );
        })}
      </ul>

      {data?.pagination && (
        <Pagination
          page={data.pagination.page}
          totalPages={data.pagination.totalPages}
          onPageChange={handleChangePage}
        />
      )}
    </section>
  );
};

export default TransactionList;
