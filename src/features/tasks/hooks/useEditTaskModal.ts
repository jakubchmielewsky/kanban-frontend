import { useSafeParams } from "@/shared/hooks/useSafeParams";
import { useModalStore } from "@/shared/stores/useModalStore";
import { useFetchTasks } from "./useFetchTasks";
import { useEffect, useState } from "react";
import { useUpdateTask } from "./useUpdateTask";
import { EditTaskSchema, EditTaskInput } from "../schemas/editTaskSchema";

export const useEditTaskModal = (taskId: string) => {
  const closeModal = useModalStore((s) => s.closeModal);
  const { boardId } = useSafeParams();
  const tasksQuery = useFetchTasks(boardId);
  const task = tasksQuery.data?.find((t) => t._id === taskId);
  const updateTaskMutation = useUpdateTask(boardId);

  const [formData, setFormData] = useState<EditTaskInput>({
    title: "",
    description: "",
    subtasks: [],
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof EditTaskInput, string>>
  >({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        subtasks: task.subtasks.map((subtask) => ({
          _id: subtask._id ?? crypto.randomUUID(),
          title: subtask.title,
          isCompleted: subtask.isCompleted,
        })),
      });
    }
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
    const validation = EditTaskSchema.safeParse(formData);

    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof EditTaskInput, string>> = {};
      for (const err of validation.error.errors) {
        const path = err.path[0] as keyof EditTaskInput;
        if (!fieldErrors[path]) {
          fieldErrors[path] = err.message;
        }
      }
      setErrors(fieldErrors);
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
