'use client';
import { ReactNode, useEffect, useRef } from 'react';
import { useModalStore } from '@/store/modal.store';
import { ModalType } from '@/types/modals';

type Props = {
  children: ReactNode;
  modalName: ModalType;
};

const Modal = ({ children, modalName }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const modal = useModalStore(state => state.modal);
  const closeModal = useModalStore(state => state.closeModal);
  const isOpen = modal === modalName;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog?.showModal();
    } else {
      dialog?.close();
    }
  }, [isOpen]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    const rect = dialog.getBoundingClientRect();

    const isBackdrop =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (isBackdrop) {
      closeModal();
    }
  };

  return (
    <dialog ref={dialogRef} onClick={handleBackdropClick}>
      {children}
      <button type="button" onClick={closeModal}>
        닫기
      </button>
    </dialog>
  );
};

export default Modal;
