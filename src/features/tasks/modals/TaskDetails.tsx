import OptionsIcon from "../../../assets/icon-vertical-ellipsis.svg?react";
import { ContextMenu } from "../../../shared/components/ContextMenu";
import { useContextMenu } from "../../../shared/hooks/useContextMenu";
import { Subtask } from "../components/Subtask";
import { useTaskDetailsModal } from "../hooks/useTaskDetailsModal";

interface Props {
  payload: { taskId: string };
}

export const TaskDetails: React.FC<Props> = ({ payload }) => {
  const { isContextMenuVisible, coords, openContextMenu, closeContextMenu } =
    useContextMenu();

  const {
    task,
    totalSubtasks,
    completedSubtasks,
    handleOpenDeleteTaskModal,
    handleOpenEditTaskModal,
    handleToggleCompleteSubtask,
  } = useTaskDetailsModal(payload.taskId);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="heading-l">{task.title}</h3>
        <button
          className="p-2 cursor-pointer"
          onClick={(e) => openContextMenu(e)}
        >
          <OptionsIcon />
        </button>
        {isContextMenuVisible && (
          <ContextMenu x={coords.x} y={coords.y} close={closeContextMenu}>
            <li>
              <button
                className="cursor-pointer w-full text-left"
                onClick={handleOpenEditTaskModal}
              >
                Edit
              </button>
            </li>
            <li>
              <button
                className="text-red cursor-pointer w-full text-left"
                onClick={handleOpenDeleteTaskModal}
              >
                Delete
              </button>
            </li>
          </ContextMenu>
        )}
      </div>

      <p className="mt-3 body-l text-medium-gray">{task.description}</p>

      {totalSubtasks > 0 && (
        <h5 className="mt-5 mb-3 body-m text-medium-gray">
          {`Subtasks (${completedSubtasks} of ${totalSubtasks})`}
        </h5>
      )}

      {task.subtasks.map((subtask) => (
        <Subtask
          subtask={subtask}
          key={subtask._id}
          handleToggleCompleteSubtask={handleToggleCompleteSubtask}
        />
      ))}
    </div>
  );
};
