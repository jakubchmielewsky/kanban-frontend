import api from "../../lib/axios";
import { Task, TaskDto } from "../../shared/types/task";

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

export const createTask = async (newTask: TaskDto): Promise<Task> => {
  const res = await api.post(`/columns/${newTask.column}/tasks`, {
    title: newTask.title,
    description: newTask.description,
  });
  return res.data.data.doc;
};
