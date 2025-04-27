import { createPortal } from "react-dom";
import { useModalStore } from "../stores/useModalStore";
import { CreateBoard } from "../../features/boards/modals/CreateBoard";
import { TaskDetails } from "../../features/tasks/modals/TaskDetails";
import { CreateTask } from "../../features/tasks/modals/CreateTask";
import { EditTask } from "../../features/tasks/modals/EditTask";
import { DeleteTask } from "../../features/tasks/modals/DeleteTask";
import { DeleteBoard } from "../../features/boards/modals/DeleteBoard";
import { UpdateBoard } from "../../features/boards/modals/UpdateBoard";

export const Modal: React.FC = () => {
  const current = useModalStore((store) => store.current);
  const closeModal = useModalStore((store) => store.closeModal);

  if (!current) return null;

  let modalContent;

  switch (current.name) {
    case "CREATE_BOARD":
      modalContent = <CreateBoard />;
      break;
    case "TASK_DETAILS":
      modalContent = <TaskDetails payload={current.payload} />;
      break;
    case "CREATE_TASK":
      modalContent = <CreateTask />;
      break;
    case "UPDATE_TASK":
      modalContent = <EditTask payload={current.payload} />;
      break;
    case "DELETE_TASK":
      modalContent = <DeleteTask payload={current.payload} />;
      break;
    case "DELETE_BOARD":
      modalContent = <DeleteBoard payload={current.payload} />;
      break;
    case "UPDATE_BOARD":
      modalContent = <UpdateBoard payload={current.payload} />;
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
