import { ReactNode } from 'react';
import AuthGuard from '@/components/AuthGuard';

type Props = {
  children: ReactNode;
  modal: ReactNode;
};

const DashboardLayout = ({ children, modal }: Props) => {
  return (
    <AuthGuard>
      <section>
        {children}
        {modal}
      </section>
    </AuthGuard>
  );
};

export default DashboardLayout;
