'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransactionList } from '@/hooks/useTransaction';
import { useAuthStore } from '@/store/auth.store';
import { useModalStore } from '@/store/modal.store';
import { removeToken } from '@/utils/token';

const DashboardPage = () => {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  const router = useRouter();
  const openModal = useModalStore(state => state.openModal);
  const { data } = useTransactionList();

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

      <button onClick={() => openModal('category')}>카테고리 추가</button>

      <main>
        {data?.slice(0, 5).map(item => (
          <Link key={item.id} href={`/transactions/${item.id}`}>
            <div>
              <span>{item.title}</span>
              <span>{item.amount.toLocaleString()}원</span>
            </div>
          </Link>
        ))}
        <Link href={'/transactions'}>더보기</Link>
      </main>
    </div>
  );
};

export default DashboardPage;

// 'use client';

// import Link from 'next/link';

// const DashboardPage = () => {
//   return (
//     <div>
//       <h1>Dashboard</h1>

//       <Link href="/transactions/test">거래 상세 열기</Link>
//     </div>
//   );
// };

// export default DashboardPage;
