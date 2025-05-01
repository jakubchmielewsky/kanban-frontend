import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../api";
import { Task } from "../../../shared/types/task";

export interface DeleteTaskMutation {
  taskId: string;
}

export const useDeleteTask = (boardId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ taskId }: DeleteTaskMutation) => deleteTask(taskId),

    onMutate: async ({ taskId }) => {
      await queryClient.cancelQueries({ queryKey: ["tasks", boardId] });

      const previousTasks = queryClient.getQueryData<Task[]>([
        "tasks",
        boardId,
      ]);

      const updatedTasks = previousTasks?.filter((task) => task._id !== taskId);

      queryClient.setQueryData(["tasks", boardId], updatedTasks);

      return { previousTasks };
    },

    onError: (_error, _variables, context) => {
      queryClient.setQueryData(["tasks", boardId], context?.previousTasks);
    },
  });
};
