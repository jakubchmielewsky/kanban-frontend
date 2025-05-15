import { Task } from "@/shared/types/task";
import { useDeleteTask } from "./useDeleteTask";
import { useModalStore } from "@/shared/stores/useModalStore";

export const useDeleteTaskModal = (task: Task) => {
  const deleteTaskMutation = useDeleteTask(task.boardId);

  const closeModal = useModalStore((s) => s.closeModal);
  const openModal = useModalStore((s) => s.openModal);

  const handleDeleteTask = (): void => {
    try {
      deleteTaskMutation.mutateAsync({ taskId: task._id });
      closeModal();
    } catch (error) {
      // TODO: error toast
    }
  };

  const handleCancel = (): void => {
    openModal({ name: "TASK_DETAILS", payload: { taskId: task._id } });
  };

  return {
    handleCancel,
    handleDeleteTask,
  };
};
