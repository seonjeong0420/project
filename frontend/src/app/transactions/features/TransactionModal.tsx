import Modal from '@/components/ui/Modal';
import { useModalStore } from '@/store/modal.store';
import TransactionForm from './TransactionForm';

const TransactionModal = () => {
  const closeModal = useModalStore(state => state.closeModal);

  return (
    <Modal modalName={'transaction'}>
      <h1>내역 추가</h1>
      <p>내역 정보를 입력하세요.</p>
      <TransactionForm onClose={closeModal} />
    </Modal>
  );
};

export default TransactionModal;
