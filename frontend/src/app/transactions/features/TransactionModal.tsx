import Modal from '@/components/ui/Modal';
import { useModalStore } from '@/store/modal.store';
import { Transaction } from '@/types/transaction';
import TransactionForm from './TransactionForm';

const TransactionModal = () => {
  const closeModal = useModalStore(state => state.closeModal);
  const modalData = useModalStore(state => state.modalData);
  const transaction = modalData as Transaction | null;
  const isEdit = transaction !== null;

  return (
    <Modal modalName={'transaction'}>
      <h1>{isEdit ? '내역 수정' : '내역 추가'}</h1>
      <p>{isEdit ? '내역 정보를 수정하세요.' : '내역 정보를 입력하세요.'}</p>
      <TransactionForm transaction={transaction} onClose={closeModal} />
    </Modal>
  );
};

export default TransactionModal;
