import { useModalStore } from "../../../shared/stores/useModalStore";
import { Task as TaskType } from "../../../shared/types/task";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  task: TaskType;
}

export const Task: React.FC<Props> = ({ task }) => {
  const openModal = useModalStore((store) => store.openModal);

  const totalSubtasks = task.subtasks.length;
  const completedSubtasks = task.subtasks.reduce(
    (completed, subtask) => completed + (subtask.isCompleted ? 1 : 0),
    0
  );

  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: task._id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
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
      className="w-full px-4 py-6 bg-white rounded-lg shadow-md cursor-pointer"
      onClick={handleOpenViewTaskModal}
    >
      <h4 className="heading-m">{task.title}</h4>
      <h5 className="body-m text-medium-gray mt-2">{`${completedSubtasks} of ${totalSubtasks} subtasks`}</h5>
    </div>
  );
};
