import { categoryTypeLabel } from '@/constants/transaction';
import { useTransactionList } from '@/hooks/useTransaction';

type Props = {};

const TransactionList = (props: Props) => {
  const { data } = useTransactionList();

  return (
    <section>
      <ul>
        {data?.map(item => {
          return (
            <li key={item.id}>
              <a href="">
                <span>{item.title}</span>
                <span>{categoryTypeLabel[item.type]}</span>
                <span>{item.memo}</span>
                <span>{item.amount}</span>
                <span>{item.date}</span>
              </a>
              <button>내역 수정</button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default TransactionList;
