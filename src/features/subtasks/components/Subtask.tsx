import { Subtask as SubtaskType } from "../../../shared/types/subtask";
import IconCheck from "../../../assets/icon-check.svg?react";
import { useUpdateSubtask } from "../hooks/useUpdateSubtask";
import React from "react";

interface SubtaskProps {
  subtask: SubtaskType;
}

const SubtaskComponent: React.FC<SubtaskProps> = ({ subtask }) => {
  const updateSubtaskMutation = useUpdateSubtask();

  const handleToggleCompleteSubtask = () => {
    updateSubtaskMutation.mutateAsync({
      ...subtask,
      isCompleted: !subtask.isCompleted,
    });
  };

  return (
    <button
      className="flex items-center w-full py-3 px-4 mt-2 bg-light-gray rounded-sm hover:bg-main-purple-hover"
      onClick={handleToggleCompleteSubtask}
    >
      <div
        className={`flex items-center justify-center size-4 mr-4 cursor-pointer rounded-xs ${
          subtask.isCompleted
            ? "bg-main-purple"
            : "border border-lines-light bg-white"
        }`}
      >
        <IconCheck />
      </div>
      <p
        className={
          subtask.isCompleted
            ? "body-m text-medium-gray line-through"
            : "body-m"
        }
      >
        {subtask.title}
      </p>
    </button>
  );
};

export const Subtask = React.memo(SubtaskComponent);
