import IconCheck from "../../../assets/icon-check.svg?react";
import React from "react";

interface Props {
  subtask: {
    _id?: string;
    tempId?: string;
    title: string;
    isCompleted: boolean;
  };
  handleToggleCompleteSubtask: (
    subtaskId: string,
    isCompleted: boolean
  ) => void;
}

const SubtaskComponent: React.FC<Props> = ({
  subtask,
  handleToggleCompleteSubtask,
}) => {
  const handleClick = () => {
    if (subtask._id)
      handleToggleCompleteSubtask(subtask._id, !subtask.isCompleted);
    else if (subtask.tempId)
      handleToggleCompleteSubtask(subtask.tempId, !subtask.isCompleted);
  };
  return (
    <button
      className="flex items-center w-full py-3 px-4 mt-2 bg-light-gray rounded-sm hover:bg-main-purple-hover"
      onClick={handleClick}
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
