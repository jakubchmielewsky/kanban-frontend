import { createPortal } from "react-dom";
import { useModalStore } from "../stores/useModalStore";
import { AddBoard } from "../../features/boards/modals/AddBoardModal";
import { ViewTask } from "../../features/tasks/modals/ViewTask";
import { AddNewTask } from "../../features/tasks/modals/AddNewTask";
import { EditTask } from "../../features/tasks/modals/EditTask";

export const Modal: React.FC = () => {
  const current = useModalStore((store) => store.current);
  const closeModal = useModalStore((store) => store.closeModal);

  if (!current) return null;

  const MODAL_COMPONENTS = {
    ADD_BOARD: <AddBoard />,
    VIEW_TASK: <ViewTask payload={current.payload} />,
    ADD_TASK: <AddNewTask />,
    EDIT_TASK: <EditTask payload={current.payload} />,
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
