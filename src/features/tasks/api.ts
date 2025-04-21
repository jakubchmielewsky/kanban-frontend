import api from "../../lib/axios";
import { Task } from "../../shared/types/task";

export const fetchTasks = async (columnId: string): Promise<Task[]> => {
  const res = await api.get(`/columns/${columnId}/tasks`);
  return res.data.data.data;
};

export const getTask = async (taskId: string): Promise<Task> => {
  const res = await api.get(`/tasks/${taskId}`);
  return res.data.data.data;
};

export const updateTaskStatus = async (
  taskId: string,
  targetColumnId: string
): Promise<Task> => {
  const res = await api.patch(`/tasks/${taskId}`, { column: targetColumnId });
  return res.data.data.data;
};
