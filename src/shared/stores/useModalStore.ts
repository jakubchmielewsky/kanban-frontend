import { create } from "zustand";
import { ModalType } from "../types/modals";
import { createJSONStorage, persist } from "zustand/middleware";

interface ModalState {
  current: ModalType | null;
  openModal: (m: ModalType) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>()(
  persist(
    (set) => ({
      current: null,
      openModal: (modal) => set({ current: modal }),
      closeModal: () => set({ current: null }),
    }),
    {
      name: "modal-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
