import { Task as TaskType } from "../../../types/task";

interface TaskProps {
  task: TaskType;
}

export const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <div className="w-full px-4 py-6 bg-white rounded-lg shadow-md">
      <h4 className="heading-m">{task.title}</h4>
      <h5 className="body-m text-medium-gray mt-2">{`0 of 0 subtasks`}</h5>
    </div>
  );
};
