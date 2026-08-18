'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useRef } from 'react';
import { useModalStore } from '@/store/modal.store';
import { ModalType } from '@/types/modals';

type Props = {
  children: ReactNode;
  modalName?: ModalType;
  onClose?: () => void;
};

const Modal = ({ children, modalName, onClose }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  const modal = useModalStore(state => state.modal);
  const closeModal = useModalStore(state => state.closeModal);

  // modalName이 있으면 Zustand 모달
  // modalName이 없으면 Route 기반 모달
  const isOpen = modalName ? modal === modalName : true;

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    }

    if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const handleClose = () => {
    if (modalName) {
      // Zustand 모달
      closeModal();
      onClose?.();
      return;
    }

    // Intercepting Route 모달
    onClose?.();
    router.back();
  };

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
      handleClose();
    }
  };

  return (
    <dialog ref={dialogRef} onClick={handleBackdropClick}>
      {children}

      <button type="button" onClick={handleClose}>
        닫기
      </button>
    </dialog>
  );
};

export default Modal;
