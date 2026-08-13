import { ReactNode } from 'react';
import AuthGuard from '@/components/AuthGuard';
import CategoryModal from './features/category/CategoryModal';

type Props = {
  children: ReactNode;
  modal: ReactNode;
};

const DashboardLayout = ({ children, modal }: Props) => {
  return (
    // <>
    //   <section>{children}</section>
    //   {modal}
    // </>
    <AuthGuard>
      <section>
        {children}
        {modal}
      </section>
      <CategoryModal />
    </AuthGuard>
  );
};

export default DashboardLayout;
