import { Subtask } from "../../../shared/types/subtask";
import { useState } from "react";

export const useSubtasksList = () => {
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);

  const handleSubtaskChange = (id: string, value: string) => {
    setSubtasks((prev) =>
      prev.map((subtask) =>
        subtask._id === id ? { ...subtask, title: value } : subtask
      )
    );
  };

  const handleSubtaskRemove = (id: string) => {
    setSubtasks((prev) => prev.filter((subtask) => subtask._id !== id));
  };

  const handleAddSubtask = () => {
    const newSubtask: Subtask = {
      title: "",
      _id: (Date.now() + Math.random()).toString(),
      isCompleted: false,
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
