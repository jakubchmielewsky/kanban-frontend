import { createPortal } from "react-dom";
import { useModalStore } from "./stores/useModalStore";

export const Modal: React.FC = () => {
  const current = useModalStore((store) => store.current);
  const closeModal = useModalStore((store) => store.closeModal);

  if (!current) return null;

  const MODAL_COMPONENTS = {
    VIEW_TASK: <div>kghfihgfigfitgf</div>,
  };

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/30">
      <div className="bg-white w-full mx-8 px-4 py-6 rounded-lg shadow-xl max-w-[480px]">
        {MODAL_COMPONENTS[current.name]}
      </div>
    </div>,
    document.body
  );
};
