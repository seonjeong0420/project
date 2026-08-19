import Modal from '@/components/ui/Modal';
import TransactionForm from './TransactionForm';

const TransactionModal = () => {
  return (
    <Modal modalName={'transaction'}>
      <h1>내역 추가</h1>
      <p>내역 정보를 입력하세요.</p>
      <TransactionForm />
    </Modal>
  );
};

export default TransactionModal;
