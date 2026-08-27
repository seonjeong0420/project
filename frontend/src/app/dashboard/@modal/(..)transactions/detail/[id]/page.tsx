'use client';
import { use } from 'react';
import Modal from '@/components/ui/Modal';
import { useTransactionDetail } from '@/hooks/useTransaction';

type Props = {
  params: Promise<{ id: string }>;
};

const TransactionsModal = ({ params }: Props) => {
  const { id } = use(params);
  const { data } = useTransactionDetail(id);

  return (
    <Modal>
      <h1>내역관리</h1>
      <span>transaction ID : {id}</span>
      <ul>
        <li>타입 : {data?.type}</li>
        <li>타이틀 : {data?.title}</li>
        <li>금액 : {data?.amount}</li>
        <li>메모 : {data?.memo}</li>
        <li>날짜 : {data?.date}</li>
      </ul>
    </Modal>
  );
};

export default TransactionsModal;
