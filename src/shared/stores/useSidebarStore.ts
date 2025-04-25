import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SidebarState {
  isOpen: boolean;
  showSidebar: () => void;
  hideSidebar: () => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isOpen: true,
      showSidebar: () => set({ isOpen: true }),
      hideSidebar: () => set({ isOpen: false }),
    }),
    {
      name: "sidebar-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
