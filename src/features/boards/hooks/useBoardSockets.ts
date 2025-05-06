import { useEffect } from "react";
import { socket } from "../../../lib/socket";
import { Task } from "../../../shared/types/task";
import { useQueryClient } from "@tanstack/react-query";

export const useBoardSockets = (boardId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!boardId) return;

    socket.emit("join_board", boardId);

    return () => {
      socket.emit("leave_board", boardId);
    };
  }, [boardId]);

  useEffect(() => {
    const onTaskCreated = (task: Task) => {
      queryClient.setQueryData<Task[]>(["tasks", boardId], (prev) => [
        ...(prev || []),
        task,
      ]);
    };
    const onTaskUpdated = (updatedTask: Task) => {
      queryClient.setQueryData<Task[]>(["tasks", boardId], (prev) => {
        return prev?.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        );
      });
    };
    const onTaskDeleted = (taskId: string) => {
      queryClient.setQueryData<Task[]>(["tasks", boardId], (prev) => {
        return prev?.filter((task) => task._id !== taskId);
      });
    };

    socket.on("task_created", onTaskCreated);
    socket.on("task_updated", onTaskUpdated);
    socket.on("task_deleted", onTaskDeleted);

    return () => {
      socket.off("task_created", onTaskCreated);
      socket.off("task_updated", onTaskUpdated);
      socket.off("task_deleted", onTaskDeleted);
    };
  }, [boardId, queryClient]);
};
