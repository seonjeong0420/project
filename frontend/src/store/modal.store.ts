import { create } from 'zustand';
import { ModalType } from '@/types/modals';

interface ModalState {
  modal: ModalType;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>(set => ({
  modal: null,
  openModal: modal => set({ modal }),
  closeModal: () => set({ modal: null }),
}));
