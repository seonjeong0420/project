import Link from 'next/link';
import { categoryTypeLabel } from '@/constants/transaction';
import { useTransactionList } from '@/hooks/useTransaction';
import { Transaction } from '@/types/transaction';

type Props = {
  onEdit?: (item: Transaction) => void;
};
const TransactionList = ({ onEdit }: Props) => {
  const { data } = useTransactionList();

  return (
    <section>
      <ul>
        {data?.map(item => {
          return (
            <li key={item.id}>
              <Link href={`/transactions/${item.id}`}>
                <span>{item.title}</span>
                <span>{categoryTypeLabel[item.type]}</span>
                <span>{item.memo}</span>
                <span>{item.amount}</span>
                <span>{item.date}</span>
              </Link>
              {onEdit && (
                <button type="button" onClick={() => onEdit(item)}>
                  내역 수정
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default TransactionList;
