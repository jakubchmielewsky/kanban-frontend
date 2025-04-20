import { Subtask as SubtaskType } from "../../../shared/types/subtask";
import IconCheck from "../../../assets/icon-check.svg?react";
import { useUpdateSubtask } from "../hooks/useUpdateSubtask";

interface SubtaskProps {
  subtask: SubtaskType;
}

export const Subtask: React.FC<SubtaskProps> = ({ subtask }) => {
  const updateSubtaskMutation = useUpdateSubtask();

  const handleToggleCompleteSubtask = () => {
    updateSubtaskMutation.mutateAsync({
      ...subtask,
      isCompleted: !subtask.isCompleted,
    });
  };

  return (
    <div className="flex items-center py-3 px-4 mt-2 bg-light-gray rounded-sm">
      <button
        className={`flex items-center justify-center size-4 mr-4 cursor-pointer rounded-xs ${
          subtask.isCompleted
            ? "bg-main-purple"
            : "border border-lines-light bg-white"
        }`}
        onClick={handleToggleCompleteSubtask}
      >
        <IconCheck />
      </button>
      <p
        className={
          subtask.isCompleted
            ? "body-m text-medium-gray line-through"
            : "body-m"
        }
      >
        {subtask.title}
      </p>
    </div>
  );
};
