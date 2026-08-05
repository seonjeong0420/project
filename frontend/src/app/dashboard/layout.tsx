import { ReactNode } from 'react';
import AuthGuard from '@/components/AuthGuard';
import CategoryModal from './features/category/CategoryModal';

type Props = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <AuthGuard>
      <section>{children}</section>
      <CategoryModal />
    </AuthGuard>
  );
};

export default DashboardLayout;
