'use client';

import { use } from 'react';
import { useTransactionDetail } from '@/hooks/useTransaction';

type Props = {
  params: Promise<{ id: string }>;
};

const TransactionDetail = ({ params }: Props) => {
  const { id } = use(params);
  const { data } = useTransactionDetail(id);

  return (
    <div>
      <h1>상세 내역 정리</h1>
      <span>{data?.title}</span>
      <span>{data?.amount}</span>
      <span>{data?.date}</span>
      <span>{data?.memo}</span>
    </div>
  );
};

export default TransactionDetail;
