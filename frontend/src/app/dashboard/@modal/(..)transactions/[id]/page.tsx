import Modal from '@/components/ui/Modal';

type Props = {
  params: Promise<{ id: string }>;
};

const TransactionsModal = async ({ params }: Props) => {
  const { id } = await params;

  return (
    <Modal>
      <h1>내역관리</h1>
      <span>transaction ID : {id}</span>
    </Modal>
  );
};

export default TransactionsModal;
