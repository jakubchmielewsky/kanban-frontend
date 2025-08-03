import { useSafeParams } from "@/shared/hooks/useSafeParams";
import { useModalStore } from "@/shared/stores/useModalStore";
import { useFetchTasks } from "./useFetchCards";
import { useEffect, useState } from "react";
import { useUpdateTask } from "./useUpdateTask";
import { CreateEditTaskSchema } from "../schemas/createEditTaskSchema";

interface formData {
  title: string;
  description: string;
  subtasks: { _id: string; title: string; isCompleted: boolean }[];
}

export const useEditTaskModal = (taskId: string) => {
  const closeModal = useModalStore((s) => s.closeModal);
  const { boardId } = useSafeParams();
  const tasksQuery = useFetchTasks(boardId);
  const task = tasksQuery.data?.find((t) => t._id === taskId);
  const updateTaskMutation = useUpdateTask(boardId);

  const [formData, setFormData] = useState<formData>({
    title: "",
    description: "",
    subtasks: [],
  });

  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    api?: string;
  }>();

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      ...task,
    }));
  }, [task]);

  const handleAddSubtask = () => {
    setFormData((prev) => ({
      ...prev,
      subtasks: [
        ...prev.subtasks,
        { _id: crypto.randomUUID(), title: "", isCompleted: false },
      ],
    }));
  };

  const handleSubtaskChange = (_id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      subtasks: prev.subtasks.map((s) =>
        s._id === _id ? { ...s, title: value } : s
      ),
    }));
  };

  const handleSubtaskRemove = (_id: string) => {
    setFormData((prev) => ({
      ...prev,
      subtasks: prev.subtasks.filter((s) => s._id !== _id),
    }));
  };

  const handleSubmit = async () => {
    const validation = CreateEditTaskSchema.safeParse(formData);

    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;

      setErrors((prev) => ({
        ...prev,
        title: fieldErrors.title?.[0],
        description: fieldErrors.description?.[0],
      }));
      return;
    }

    try {
      await updateTaskMutation.mutateAsync({
        taskId,
        updates: {
          ...task,
          ...formData,
        },
      });
      closeModal();
    } catch (e) {
      // TODO: obsługa błędów (toast, log)
    }
  };

  return {
    formData,
    setFormData,
    handleSubmit,
    handleAddSubtask,
    handleSubtaskChange,
    handleSubtaskRemove,
    setErrors,
    errors,
    isPending: updateTaskMutation.isPending,
  };
};
