'use client';

import CategoryModal from '@/app/dashboard/features/category/CategoryModal';
import { useModalStore } from '@/store/modal.store';

const ModalProvider = () => {
  const modal = useModalStore(state => state.modal);

  return <>{modal === 'category' && <CategoryModal />}</>;
};

export default ModalProvider;
