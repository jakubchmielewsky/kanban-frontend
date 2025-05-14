import { useSafeParams } from "@/shared/hooks/useSafeParams";
import { useFetchTasks } from "./useFetchTasks";
import { useModalStore } from "@/shared/stores/useModalStore";
import { useUpdateTask } from "./useUpdateTask";

export const useTaskDetailsModal = (taskId: string) => {
  const { boardId } = useSafeParams();
  const tasksQuery = useFetchTasks(boardId);
  const task = tasksQuery.data?.find((task) => task._id === taskId);

  const updateTaskMutation = useUpdateTask(boardId);
  const openModal = useModalStore((a) => a.openModal);

  if (!task) {
    return {
      task: { title: "", description: "", subtasks: [] },
      totalSubtasks: 0,
      completedSubtasks: 0,
      handleOpenDeleteTaskModal: () => {},
      handleOpenEditTaskModal: () => {},
      handleToggleCompleteSubtask: () => {},
    };
  }

  const totalSubtasks = task.subtasks.length;
  const completedSubtasks = task.subtasks.reduce(
    (completed, subtask) => completed + (subtask.isCompleted ? 1 : 0),
    0
  );

  const handleOpenEditTaskModal = () => {
    openModal({ name: "UPDATE_TASK", payload: { task } });
  };

  const handleOpenDeleteTaskModal = () => {
    openModal({ name: "DELETE_TASK", payload: { task } });
  };
  const handleToggleCompleteSubtask = async (
    subtaskId: string,
    isCompleted: boolean
  ) => {
    const updatedSubtasks = task.subtasks.map((subtask) =>
      subtask._id === subtaskId ? { ...subtask, isCompleted } : subtask
    );

    try {
      await updateTaskMutation.mutateAsync({
        taskId: task._id,
        updates: {
          ...task,
          subtasks: updatedSubtasks,
        },
      });
    } catch (error: any) {
      // TODO: implement toast
    }
  };

  return {
    task,
    totalSubtasks,
    completedSubtasks,
    handleOpenDeleteTaskModal,
    handleOpenEditTaskModal,
    handleToggleCompleteSubtask,
  };
};
