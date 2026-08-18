'use client';

import CategoryModal from '@/app/category/CategoryModal';
import TransactionModal from '@/app/transactions/features/TransactionModal';
import { useModalStore } from '@/store/modal.store';

const ModalProvider = () => {
  const modal = useModalStore(state => state.modal);

  return (
    <>
      {modal === 'category' && <CategoryModal />}
      {modal === 'transaction' && <TransactionModal />}
    </>
  );
};

export default ModalProvider;
