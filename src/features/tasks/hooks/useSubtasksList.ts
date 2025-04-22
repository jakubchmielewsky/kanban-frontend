import { SubtaskFormData } from "../../../shared/types/subtask";
import { useState } from "react";

export const useSubtasksList = () => {
  const [subtasks, setSubtasks] = useState<SubtaskFormData[]>([]);

  const handleSubtaskChange = (id: number, value: string) => {
    setSubtasks((prev) =>
      prev.map((subtask) =>
        subtask.tempId === id ? { ...subtask, title: value } : subtask
      )
    );
  };

  const handleSubtaskRemove = (id: number) => {
    setSubtasks((prev) => prev.filter((subtask) => subtask.tempId !== id));
  };

  const handleAddSubtask = () => {
    const newSubtask: SubtaskFormData = {
      title: "",
      tempId: Date.now() + Math.random(),
    };
    setSubtasks((prev) => [...prev, newSubtask]);
  };

  return {
    handleAddSubtask,
    handleSubtaskChange,
    handleSubtaskRemove,
    subtasks,
    setSubtasks,
  };
};
