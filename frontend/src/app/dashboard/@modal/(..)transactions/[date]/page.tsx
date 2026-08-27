'use client';

import React, { use } from 'react';
import Modal from '@/components/ui/Modal';
import { useTransactionDate } from '@/hooks/useTransaction';

type Props = { params: Promise<{ date: string }> };

const TransactionCalendarModalPage = ({ params }: Props) => {
  const { date } = use(params);
  const { data, isPending } = useTransactionDate(date);

  if (isPending) {
    return (
      <Modal>
        <p>내역을 불러오는 중...</p>
      </Modal>
    );
  }

  const transactions = data ?? [];

  return (
    <Modal>
      <h2>{date}</h2>
      {transactions.length === 0 ? (
        <p>해당 날짜의 내역이 없습니다.</p>
      ) : (
        <ul>
          {transactions.map(transaction => (
            <li key={transaction.id}>
              <div>
                <span>{transaction.title}</span>
                <span>{transaction.amount.toLocaleString()}원</span>
              </div>

              <div>
                <span>{transaction.type === 'INCOME' ? '수입' : '지출'}</span>
                <span>{transaction.memo}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
};

export default TransactionCalendarModalPage;
