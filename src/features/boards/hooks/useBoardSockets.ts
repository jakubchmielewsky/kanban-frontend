import { useEffect } from "react";
import { socket } from "../../../lib/socket";
import { Task } from "../../../shared/types/task";

export const useBoardSockets = (boardId: string) => {
  useEffect(() => {
    if (!boardId) return;

    socket.emit("join_board", boardId);

    return () => {
      socket.emit("leave_board", boardId);
    };
  }, [boardId]);

  useEffect(() => {
    const onTaskCreated = (task: Task) => {
      console.log("Event: task_created", task);
    };
    const onTaskUpdated = (task: Task) => {
      console.log("Event: task_updated", task);
    };
    const onTaskDeleted = (taskId: string) => {
      console.log("Event: task_deleted", taskId);
    };

    socket.on("task_created", onTaskCreated);
    socket.on("task_updated", onTaskUpdated);
    socket.on("task_deleted", onTaskDeleted);

    return () => {
      socket.off("task_created", onTaskCreated);
      socket.off("task_updated", onTaskUpdated);
      socket.off("task_deleted", onTaskDeleted);
    };
  }, []);
};
