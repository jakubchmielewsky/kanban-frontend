import { createPortal } from "react-dom";
import { useModalStore } from "../stores/useModalStore";
import { AddBoard } from "../../features/boards/modals/AddBoardModal";
import { TaskDetails } from "../../features/tasks/modals/TaskDetails";
import { AddNewTask } from "../../features/tasks/modals/AddNewTask";
import { EditTask } from "../../features/tasks/modals/EditTask";

export const Modal: React.FC = () => {
  const current = useModalStore((store) => store.current);
  const closeModal = useModalStore((store) => store.closeModal);

  if (!current) return null;

  let modalContent;

  switch (current.name) {
    case "ADD_BOARD":
      modalContent = <AddBoard />;
      break;
    case "TASK_DETAILS":
      modalContent = <TaskDetails payload={current.payload} />;
      break;
    case "ADD_TASK":
      modalContent = <AddNewTask />;
      break;
    case "EDIT_TASK":
      modalContent = <EditTask payload={current.payload} />;
      break;
    default:
      modalContent = null;
  }

  return createPortal(
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/30"
      onClick={closeModal}
    >
      <div
        className="bg-white w-full mx-8 px-6 py-8 rounded-lg shadow-xl max-w-[420px]"
        onClick={(e) => e.stopPropagation()}
      >
        {modalContent}
      </div>
    </div>,
    document.body
  );
};
