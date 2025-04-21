import { useGetSubtasks } from "../../subtasks/hooks/useGetSubtasks";
import { useModalStore } from "../../../shared/stores/useModalStore";
import { Task as TaskType } from "../../../shared/types/task";

interface TaskProps {
  task: TaskType;
}

export const Task: React.FC<TaskProps> = ({ task }) => {
  const openModal = useModalStore((store) => store.openModal);
  const subtasks = useGetSubtasks(task._id);

  const completedSubtasks = subtasks.data?.filter(
    (subtask) => subtask.isCompleted
  ).length;
  const totalSubtasks = subtasks.data?.length || 0;

  const handleOpenViewTaskModal = () => {
    openModal({
      name: "VIEW_TASK",
      payload: { taskId: task._id },
    });
  };

  return (
    <div
      className="w-full px-4 py-6 bg-white rounded-lg shadow-md cursor-pointer"
      onClick={handleOpenViewTaskModal}
    >
      <h4 className="heading-m">{task.title}</h4>
      <h5 className="body-m text-medium-gray mt-2">{`${completedSubtasks} of ${totalSubtasks} subtasks`}</h5>
    </div>
  );
};
