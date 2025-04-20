import { createPortal } from "react-dom";
import { useModalStore } from "../stores/useModalStore";
import { AddBoard } from "../../features/boards/modals/AddBoardModal";
import { ViewTask } from "../../features/tasks/modals/ViewTask";

export const Modal: React.FC = () => {
  const current = useModalStore((store) => store.current);
  const closeModal = useModalStore((store) => store.closeModal);

  if (!current) return null;

  const MODAL_COMPONENTS = {
    VIEW_TASK: <ViewTask payload={current.payload} />,
    ADD_BOARD: <AddBoard />,
  };

  return createPortal(
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/30"
      onClick={closeModal}
    >
      <div
        className="bg-white w-full mx-8 px-6 py-8 rounded-lg shadow-xl max-w-[420px]"
        onClick={(e) => e.stopPropagation()}
      >
        {MODAL_COMPONENTS[current.name]}
      </div>
    </div>,
    document.body
  );
};
