import { useSafeParams } from "../../../shared/hooks/useSafeParams";
import { Button } from "../../../shared/components/button/Button";
import { useModalStore } from "../../../shared/stores/useModalStore";
import { useDeleteTask } from "../hooks/useDeleteTask";
import { useFetchTasks } from "../hooks/useFetchTasks";
import { Task } from "../../../shared/types/task";

interface Props {
  payload: { task: Task };
}

export const DeleteTask: React.FC<Props> = ({ payload }) => {
  const { boardId } = useSafeParams();
  const tasksQuery = useFetchTasks(boardId);
  const task = tasksQuery.data?.find((task) => task._id === payload.task._id);

  const deleteTaskMutation = useDeleteTask(boardId);
  const closeModal = useModalStore((s) => s.closeModal);
  const openModal = useModalStore((s) => s.openModal);

  const handleDeleteTask = (): void => {
    if (!task) return;

    deleteTaskMutation.mutateAsync({ taskId: task._id });
    closeModal();
  };

  const handleCancel = (): void => {
    openModal({ name: "TASK_DETAILS", payload: { taskId: payload.task._id } });
  };
  return (
    <div className="space-y-6">
      <h3 className="heading-l text-red">Delete this task?</h3>
      <p className="body-l text-medium-gray">{`Are you sure you want to delete the '${task?.title}' task and its subtasks? This action cannot be reversed.`}</p>
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
