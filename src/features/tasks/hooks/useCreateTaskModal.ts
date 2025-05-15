import { useState } from "react";
import { useCreateTask } from "../hooks/useCreateTask";
import { useModalStore } from "../../../shared/stores/useModalStore";
import { useSafeParams } from "../../../shared/hooks/useSafeParams";
import { CreateEditTaskSchema } from "../schemas/createEditTaskSchema";

interface formData {
  title: string;
  description: string;
  subtasks: { _id: string; title: string; isCompleted: boolean }[];
}

export const useCreateTaskModal = (targetColumnId: string) => {
  const closeModal = useModalStore((s) => s.closeModal);
  const { boardId } = useSafeParams();

  const createTaskMutation = useCreateTask(boardId);

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

  const handleSubmit = () => {
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

    const task = {
      title: formData.title,
      description: formData.description,
      subtasks: formData.subtasks.map((subtask) => ({
        title: subtask.title,
        isCompleted: subtask.isCompleted,
      })),
      columnId: targetColumnId,
    };

    try {
      createTaskMutation.mutateAsync({ task: task });
      closeModal();
    } catch (e) {
      //TODO: toast
    }
  };

  return {
    formData,
    errors,
    setFormData,
    handleAddSubtask,
    handleSubtaskChange,
    handleSubtaskRemove,
    handleSubmit,
    isPending: createTaskMutation.isPending,
  };
};
