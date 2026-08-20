import { create } from 'zustand';
import { ModalType } from '@/types/modals';

interface ModalState {
  modal: ModalType | null;
  modalData: unknown;
  openModal: (modal: ModalType, data?: unknown) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>(set => ({
  modal: null,
  modalData: null,
  openModal: (modal, data = null) => set({ modal, modalData: data }),
  closeModal: () => set({ modal: null, modalData: null }),
}));
