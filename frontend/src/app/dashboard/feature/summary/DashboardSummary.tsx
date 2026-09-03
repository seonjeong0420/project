'use client';
import { DashboardSummary } from '@/types/dashboard';

type Props = {
  data?: DashboardSummary;
  isPending?: boolean;
  isError?: boolean;
};

const DashboardSummaryPage = ({ data, isPending, isError }: Props) => {
  if (isPending) {
    return <p>대시보드를 불러오는 중...</p>;
  }

  if (isError || !data) {
    return <p>대시보드를 불러오지 못했습니다.</p>;
  }

  return (
    <section>
      <h2>{data.month} 요약</h2>

      <div>
        <article>
          <h3>이번 달 수입</h3>
          <strong>{data.income.toLocaleString()}원</strong>
        </article>

        <article>
          <h3>이번 달 지출</h3>
          <strong>{data.expense.toLocaleString()}원</strong>
        </article>

        <article>
          <h3>잔액</h3>
          <strong>{data.balance.toLocaleString()}원</strong>
        </article>

        <article>
          <h3>거래 건수</h3>
          <strong>{data.count}건</strong>
        </article>
      </div>
    </section>
  );
};

export default DashboardSummaryPage;
