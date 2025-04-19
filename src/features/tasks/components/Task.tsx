import { useModalStore } from "../../../shared/stores/useModalStore";
import { Task as TaskType } from "../../../shared/types/task";

interface TaskProps {
  task: TaskType;
}

export const Task: React.FC<TaskProps> = ({ task }) => {
  const openModal = useModalStore((store) => store.openModal);

  const handleClick = () => {
    openModal({ name: "VIEW_TASK", payload: { taskId: task._id } });
  };

  return (
    <div
      className="w-full px-4 py-6 bg-white rounded-lg shadow-md cursor-pointer"
      onClick={handleClick}
    >
      <h4 className="heading-m">{task.title}</h4>
      <h5 className="body-m text-medium-gray mt-2">{`0 of 0 subtasks`}</h5>
    </div>
  );
};
