import api from "../../lib/axios";
import { Task, CreateTaskDto, UpdateTaskDto } from "../../shared/types/task";
import { ApiResponse } from "../../shared/types/api";

export const fetchTasks = async (boardId: string): Promise<Task[]> => {
  const res = await api.get<ApiResponse<Task[]>>(`/boards/${boardId}/tasks`);
  return res.data.data!;
};

export const fetchTask = async (taskId: string): Promise<Task> => {
  const res = await api.get<ApiResponse<Task>>(`/tasks/${taskId}`);
  return res.data.data!;
};

export const createTask = async (
  boardId: string,
  newTask: CreateTaskDto
): Promise<Task> => {
  const res = await api.post<ApiResponse<Task>>(
    `/boards/${boardId}/tasks`,
    newTask
  );
  return res.data.data!;
};

export const updateTask = async (
  taskId: string,
  updates: UpdateTaskDto
): Promise<Task> => {
  const res = await api.patch<ApiResponse<Task>>(`/tasks/${taskId}`, updates);
  return res.data.data!;
};

export const deleteTask = async (taskId: string): Promise<Task> => {
  const res = await api.delete<ApiResponse<Task>>(`/tasks/${taskId}`);
  return res.data.data!;
};
