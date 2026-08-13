import { categoryTypeLabel } from '@/constants/transaction';
import { useTransactionList } from '@/hooks/useTransaction';

const TransactionPage = () => {
  const { data } = useTransactionList();

  return (
    <div>
      <ul>
        {data?.map(item => {
          return (
            <li key={item.id}>
              <span>{item.title}</span>
              <span>{categoryTypeLabel[item.type]}</span>
              <span>{item.memo}</span>
              <span>{item.amount}</span>
              <span>{item.date}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TransactionPage;
