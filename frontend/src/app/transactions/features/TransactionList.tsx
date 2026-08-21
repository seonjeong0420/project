import Link from 'next/link';
import { categoryTypeLabel } from '@/constants/transaction';
import { useCategoryList } from '@/hooks/useCategory';
import { useTransactionDelete, useTransactionList } from '@/hooks/useTransaction';
import { Transaction } from '@/types/transaction';

type Props = {
  onEdit: (item: Transaction) => void;
};
const TransactionList = ({ onEdit }: Props) => {
  const { data } = useTransactionList();
  const transactionDelete = useTransactionDelete();
  const { data: category = [] } = useCategoryList();
  const categoryMap = new Map(category.map(item => [item.id, item.name]));

  const handleDeleteTransaction = (id: string) => {
    transactionDelete.mutate(id);
  };

  return (
    <section>
      <ul>
        {data?.map(item => {
          return (
            <li key={item.id}>
              <Link href={`/transactions/${item.id}`}>
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
    </section>
  );
};

export default TransactionList;
