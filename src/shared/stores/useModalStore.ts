import { create } from "zustand";
import { ModalType } from "../types/modals";

interface ModalState {
  current: ModalType | null;
  openModal: (m: ModalType) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  current: null,
  openModal: (modal) => set({ current: modal }),
  closeModal: () => set({ current: null }),
}));
