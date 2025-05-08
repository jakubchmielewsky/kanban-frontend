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

  const totalSubtasks = task.subtasks.length;
  const completedSubtasks = task.subtasks.reduce(
    (completed, subtask) => completed + (subtask.isCompleted ? 1 : 0),
    0
  );

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
      className={`w-full px-4 py-6 bg-white rounded-lg shadow-md  ${
        isDragging && "opacity-30"
      } ${
        isDragOverlay
          ? "cursor-grabbing opacity-70 border border-dashed"
          : "cursor-pointer"
      }`}
      onClick={handleOpenViewTaskModal}
    >
      <h4 className="heading-m">{task.title}</h4>
      <h5 className="body-m text-medium-gray mt-2">{`${completedSubtasks} of ${totalSubtasks} subtasks`}</h5>
    </div>
  );
};
