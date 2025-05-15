import { Button } from "../../../shared/components/button/Button";
import { Task } from "../../../shared/types/task";
import { useDeleteTaskModal } from "../hooks/useDeleteTaskModal";

interface Props {
  payload: { task: Task };
}

export const DeleteTask: React.FC<Props> = ({ payload }) => {
  const { task } = payload;
  const { handleCancel, handleDeleteTask } = useDeleteTaskModal(task);

  return (
    <div className="space-y-6">
      <h3 className="heading-l text-red">Delete this task?</h3>
      <p className="body-l text-medium-gray">{`Are you sure you want to delete the '${task.title}' task and its subtasks? This action cannot be reversed.`}</p>
      <div className="flex gap-4">
        <Button
          variant="destructive"
          className="grow"
          onClick={handleDeleteTask}
        >
          Delete
        </Button>
        <Button variant="secondary" className="grow" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
