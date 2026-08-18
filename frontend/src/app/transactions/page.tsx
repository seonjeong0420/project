'use client';
import { useModalStore } from '@/store/modal.store';
import TransactionList from './features/TransactionList';

const TransactionsPage = () => {
  const openModal = useModalStore(state => state.openModal);

  return (
    <>
      <button
        onClick={() => {
          console.log('test');
          openModal('transaction');
          console.log('after open:', useModalStore.getState().modal);
        }}
      >
        내역 추가
      </button>
      <TransactionList />
    </>
  );
};

export default TransactionsPage;
