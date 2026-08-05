'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { useModalStore } from '@/store/modal.store';
import { removeToken } from '@/utils/token';

const DashboardPage = () => {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  const router = useRouter();
  const openModal = useModalStore(state => state.openModal);

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
    </div>
  );
};

export default DashboardPage;
