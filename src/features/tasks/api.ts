import api from "../../lib/axios";
import { Task } from "../../shared/types/task";

export const fetchTasks = async (columnId: string): Promise<Task[]> => {
  const res = await api.get(`/columns/${columnId}/tasks`);
  return res.data.data.data;
};
