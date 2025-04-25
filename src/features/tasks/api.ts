import api from "../../lib/axios";
import { Task } from "../../shared/types/task";

interface NewTask {
  title: string;
  description: string;
  subtasks: { title: string; isCompleted: boolean }[];
  column: string;
}

export const fetchTasks = async (columnId: string): Promise<Task[]> => {
  const res = await api.get(`/columns/${columnId}/tasks`);
  return res.data.data.data;
};

export const getTask = async (taskId: string): Promise<Task> => {
  const res = await api.get(`/tasks/${taskId}`);
  return res.data.data.data;
};

export const updateTask = async (task: Task): Promise<Task> => {
  const res = await api.patch(`/tasks/${task._id}`, task);
  return res.data.data.data;
};

export const createTask = async (newTask: NewTask): Promise<Task> => {
  const res = await api.post(`/columns/${newTask.column}/tasks`, newTask);
  return res.data.data.doc;
};
