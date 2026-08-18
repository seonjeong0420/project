import { ReactNode } from 'react';
import AuthGuard from '@/components/AuthGuard';
import ModalProvider from '@/components/provider/ModalProvider';

// import CategoryModal from './features/category/CategoryModal';

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
      {/* <CategoryModal /> */}
      <ModalProvider />
    </AuthGuard>
  );
};

export default DashboardLayout;
