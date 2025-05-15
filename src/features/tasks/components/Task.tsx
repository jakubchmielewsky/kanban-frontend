import { useModalStore } from "../../../shared/stores/useModalStore";
import { Task as TaskType } from "../../../shared/types/task";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  task: TaskType;
  isDragOverlay?: boolean;
}

export const Task: React.FC<Props> = ({ task, isDragOverlay }) => {
  const openModal = useModalStore((store) => store.openModal);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task._id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleOpenViewTaskModal = () => {
    openModal({
      name: "TASK_DETAILS",
      payload: { taskId: task._id },
    });
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`w-full px-4 py-4 bg-white rounded-lg shadow-sm  ${
        isDragging && "opacity-30"
      } ${
        isDragOverlay
          ? "cursor-grabbing opacity-70 border border-dashed"
          : "cursor-pointer border border-lines-light/20"
      }`}
      onClick={handleOpenViewTaskModal}
    >
      <h4 className="heading-m">{task.title}</h4>
    </div>
  );
};
