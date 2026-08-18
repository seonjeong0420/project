import Modal from '@/components/ui/Modal';

const TransactionModal = () => {
  return (
    <Modal modalName={'transaction'}>
      <h1>내역 추가</h1>
      <p>내역 정보를 입력하세요.</p>
    </Modal>
  );
};

export default TransactionModal;
