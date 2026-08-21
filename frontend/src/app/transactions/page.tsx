'use client';

import { useState } from 'react';
import { useModalStore } from '@/store/modal.store';
import { TransactionListParams } from '@/types/transaction';
import TransactionFilter from './features/TransactionFilter';
import TransactionList from './features/TransactionList';

const TransactionsPage = () => {
  const [params, setParams] = useState<TransactionListParams>({
    page: 1,
    limit: 5,
  });

  const openModal = useModalStore(state => state.openModal);

  return (
    <>
      <button onClick={() => openModal('transaction')}>내역 추가</button>
      <TransactionFilter params={params} onChange={setParams} />
      <TransactionList
        params={params}
        onChange={setParams}
        onEdit={item => openModal('transaction', item)}
      />
    </>
  );
};

export default TransactionsPage;
