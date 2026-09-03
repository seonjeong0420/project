'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDashboardSummary } from '@/hooks/useDashboard';
import { useAuthStore } from '@/store/auth.store';
import { useModalStore } from '@/store/modal.store';
import { removeToken } from '@/utils/token';
import TransactionCalendar from './feature/TransactionCalendar';
import DashboardSummaryPage from './feature/summary/DashboardSummary';
import RecentTransactions from './feature/summary/RecentTransactions';

const DashboardPage = () => {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  const router = useRouter();
  const openModal = useModalStore(state => state.openModal);

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const { data, isPending, isError } = useDashboardSummary({
    year,
    month,
  });

  const handlePrevMonth = () => {
    if (month === 1) {
      setYear(prev => prev - 1);
      setMonth(12);
    } else {
      setMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setYear(prev => prev + 1);
      setMonth(1);
    } else {
      setMonth(prev => prev + 1);
    }
  };

  const handleLogout = () => {
    removeToken();
    logout();
    router.push('/login');
  };

  return (
    <div>
      <aside>
        <h1>Dashboard</h1>
        <p>
          환영합니다.
          {user?.name}님
        </p>
        <p>{user?.email}</p>
        <button type="button" onClick={handleLogout}>
          로그아웃
        </button>
      </aside>

      <div>
        <button onClick={() => openModal('category')}>카테고리 추가</button>
        <Link href={'/transactions'}>내역 더보기</Link>
      </div>

      <main>
        <div>
          <div>
            <button onClick={handlePrevMonth}>이전 달</button>
            <h2>
              {year}년 {month}월
            </h2>
            <button onClick={handleNextMonth}>다음 달</button>
          </div>

          <DashboardSummaryPage data={data} isPending={isPending} isError={isError} />
          <RecentTransactions data={data?.recentTransactions} isPending={isPending} />
        </div>
        <TransactionCalendar />
      </main>
    </div>
  );
};

export default DashboardPage;
