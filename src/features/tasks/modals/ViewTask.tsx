import { Task } from "../../../shared/types/task";
import OptionsIcon from "../../../assets/icon-vertical-ellipsis.svg?react";
import { Button } from "../../../shared/components/button/Button";
import { useGetSubtasks } from "../../subtasks/hooks/useGetSubtasks";
import { Subtask } from "../../subtasks/components/Subtask";

interface ViewTaskModalProps {
  payload: { task: Task; completedSubtasks: number; totalSubtasks: number };
}

export const ViewTask: React.FC<ViewTaskModalProps> = ({ payload }) => {
  const { task, completedSubtasks, totalSubtasks } = payload;
  const subtasks = useGetSubtasks(task._id);

  return (
    <div>
      <div className="flex items center justify-between">
        <h3 className="heading-l">{task.title}</h3>
        <Button variant="ghost">
          <OptionsIcon />
        </Button>
      </div>
      <p className="mt-3 body-l text-medium-gray">{task.description}</p>

      <h5 className="my-3 body-m text-medium-gray">{`Subtasks (${completedSubtasks} of ${totalSubtasks})`}</h5>

      {subtasks.data?.map((subtask) => {
        return <Subtask subtask={subtask} key={subtask._id} />;
      })}
    </div>
  );
};
