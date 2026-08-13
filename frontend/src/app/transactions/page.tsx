'use client';
import { useModalStore } from '@/store/modal.store';
import TransactionList from './features/TransactionList';

const TransactionsPage = () => {
  const openModal = useModalStore(state => state.openModal);
  return (
    <>
      <button onClick={() => openModal('transaction')}>내역 추가</button>
      <TransactionList />
    </>
  );
};

export default TransactionsPage;
