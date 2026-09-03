'use client';

import Link from 'next/link';
import { categoryTypeLabel } from '@/constants/transaction';
import { Transaction } from '@/types/transaction';

type Props = {
  data: Transaction[] | undefined;
  isPending?: boolean;
};

const RecentTransactions = ({ data, isPending }: Props) => {
  if (isPending) {
    return <p>최근 내역을 불러오는 중...</p>;
  }

  if (!data?.length) {
    return (
      <section>
        <h2>최근 내역</h2>
        <p>등록된 내역이 없습니다.</p>
      </section>
    );
  }

  return (
    <section>
      <h2>최근 내역</h2>

      <ul>
        {data.map(item => (
          <li key={item.id}>
            <Link href={`/transactions/${item.id}`}>
              <span>{item.title}</span>

              <span>{categoryTypeLabel[item.type]}</span>

              <span>{item.amount.toLocaleString()}원</span>

              <span>{new Date(item.date).toLocaleDateString('ko-KR')}</span>
            </Link>
          </li>
        ))}
      </ul>

      <Link href="/transactions">전체 내역 보기</Link>
    </section>
  );
};

export default RecentTransactions;
