import OptionsIcon from "../../../assets/icon-vertical-ellipsis.svg?react";
import { Dropdown } from "../../../shared/components/Dropdown";
import { Spinner } from "../../../shared/components/spinner/Spinner";
import { ContextMenu } from "../../../shared/components/ContextMenu";
import { useContextMenu } from "../../../shared/hooks/useContextMenu";
import { useModalStore } from "../../../shared/stores/useModalStore";
import { Subtask } from "../components/Subtask";
import { useGetOneTask } from "../hooks/useGetOneTask";
import { useUpdateTask } from "../hooks/useUpdateTask";
import { useGetColumns } from "../../columns/hooks/useGetColumns";
import { Column } from "../../../shared/types/column";

interface Props {
  payload: { taskId: string };
}

export const TaskDetails: React.FC<Props> = ({ payload }) => {
  const taskQuery = useGetOneTask(payload.taskId);
  const columnsQuery = useGetColumns();

  const updateTaskMutation = useUpdateTask();
  const { openModal } = useModalStore();
  const { isContextMenuVisible, coords, openContextMenu, closeContextMenu } =
    useContextMenu();

  if (taskQuery.isLoading || columnsQuery.isLoading)
    return <Spinner size="xl" />;
  if (!taskQuery.data || !columnsQuery.data) return null;

  const selectedColumn =
    columnsQuery.data.find((column) => column._id === taskQuery.data.column) ??
    null;

  const totalSubtasks = taskQuery.data.subtasks.length;
  const completedSubtasks = taskQuery.data.subtasks.reduce(
    (completed, subtask) => completed + (subtask.isCompleted ? 1 : 0),
    0
  );

  const handleOpenEditTaskModal = (): void => {
    openModal({ name: "EDIT_TASK", payload: { taskId: taskQuery.data._id } });
  };

  const handleOpenDeleteTaskModal = (): void => {
    openModal({ name: "DELETE_TASK", payload: { taskId: taskQuery.data._id } });
  };
  const handleToggleCompleteSubtask = (
    subtaskId: string,
    isCompleted: boolean
  ): void => {
    const updatedSubtasks = taskQuery.data.subtasks.map((subtask) =>
      subtask._id === subtaskId ? { ...subtask, isCompleted } : subtask
    );

    updateTaskMutation.mutateAsync({
      task: { ...taskQuery.data, subtasks: updatedSubtasks },
      sourceColumnId: taskQuery.data.column,
    });
  };

  const handleSelectColumn = (column: Column): void => {
    updateTaskMutation.mutateAsync({
      task: { ...taskQuery.data, column: column._id },
      sourceColumnId: taskQuery.data.column,
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="heading-l">{taskQuery.data.title}</h3>
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
                className="text-red cursor-pointer text-left"
                onClick={handleOpenDeleteTaskModal}
              >
                Delete
              </button>
            </li>
          </ContextMenu>
        )}
      </div>

      <p className="mt-3 body-l text-medium-gray">
        {taskQuery.data.description}
      </p>

      {totalSubtasks > 0 && (
        <h5 className="mt-5 mb-3 body-m text-medium-gray">
          {`Subtasks (${completedSubtasks} of ${totalSubtasks})`}
        </h5>
      )}

      {taskQuery.data.subtasks.map((subtask) => (
        <Subtask
          subtask={subtask}
          key={subtask._id}
          handleToggleCompleteSubtask={handleToggleCompleteSubtask}
        />
      ))}

      <h5 className="mt-5 mb-3 body-m text-medium-gray">Current Status</h5>
      <Dropdown
        options={columnsQuery.data}
        currentValue={selectedColumn}
        handleSelect={handleSelectColumn}
      />
    </div>
  );
};
