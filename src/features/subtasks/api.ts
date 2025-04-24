import { Subtask } from "../../shared/types/subtask";
import api from "../../lib/axios";

export const fetchSubtasks = async (taskId: string): Promise<Subtask[]> => {
  const res = await api.get(`/tasks/${taskId}/subtasks`);
  return res.data.data.data;
};

export const updateSubtask = async (
  updatedSubtask: Subtask
): Promise<Subtask> => {
  const res = await api.patch(
    `/subtasks/${updatedSubtask._id}`,
    updatedSubtask
  );
  return res.data.data.data;
};

export const deleteSubtask = async (subtaskId: string): Promise<void> => {
  const res = await api.delete(`/subtasks/${subtaskId}`);
  return res.data.data;
};

export const createSubtask = async (
  title: string,
  task: string
): Promise<Subtask> => {
  const res = await api.post(`/tasks/${task}/subtasks`, {
    title: title,
  });
  return res.data.data.data;
};
