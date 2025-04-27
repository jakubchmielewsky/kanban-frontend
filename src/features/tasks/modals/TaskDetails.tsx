import OptionsIcon from "../../../assets/icon-vertical-ellipsis.svg?react";
import { Dropdown } from "../../../shared/components/Dropdown";
import { ContextMenu } from "../../../shared/components/ContextMenu";
import { useContextMenu } from "../../../shared/hooks/useContextMenu";
import { useModalStore } from "../../../shared/stores/useModalStore";
import { Subtask } from "../components/Subtask";
import { useUpdateTask } from "../hooks/useUpdateTask";
import { useFetchColumns } from "../../columns/hooks/useFetchColumns";
import { Column } from "../../../shared/types/column";
import { useSafeParams } from "../../../shared/hooks/useSafeParams";
import { useFetchTasks } from "../hooks/useFetchTasks";

interface Props {
  payload: { taskId: string };
}

export const TaskDetails: React.FC<Props> = ({ payload }) => {
  const { boardId } = useSafeParams();
  const columnsQuery = useFetchColumns(boardId);
  const tasksQuery = useFetchTasks(boardId);
  const task = tasksQuery.data?.find((task) => task._id === payload.taskId);

  const updateTaskMutation = useUpdateTask(boardId);
  const openModal = useModalStore((a) => a.openModal);
  const { isContextMenuVisible, coords, openContextMenu, closeContextMenu } =
    useContextMenu();

  if (!columnsQuery.data || !task) return null;

  const selectedColumn =
    columnsQuery.data.find((column) => column._id === task.columnId) ?? null;

  const totalSubtasks = task.subtasks.length;
  const completedSubtasks = task.subtasks.reduce(
    (completed, subtask) => completed + (subtask.isCompleted ? 1 : 0),
    0
  );

  const handleOpenEditTaskModal = (): void => {
    openModal({ name: "UPDATE_TASK", payload: { task } });
  };

  const handleOpenDeleteTaskModal = (): void => {
    openModal({ name: "DELETE_TASK", payload: { task } });
  };
  const handleToggleCompleteSubtask = (
    subtaskId: string,
    isCompleted: boolean
  ): void => {
    const updatedSubtasks = task.subtasks.map((subtask) =>
      subtask._id === subtaskId ? { ...subtask, isCompleted } : subtask
    );

    updateTaskMutation.mutateAsync({
      taskId: task._id,
      updates: {
        ...task,
        subtasks: updatedSubtasks,
      },
    });
  };

  const handleSelectColumn = (column: Column): void => {
    updateTaskMutation.mutateAsync({
      taskId: task._id,
      updates: { ...task, columnId: column._id },
    });
  };

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

      <h5 className="mt-5 mb-3 body-m text-medium-gray">Current Status</h5>
      <Dropdown
        options={columnsQuery.data}
        currentValue={selectedColumn}
        handleSelect={handleSelectColumn}
      />
    </div>
  );
};
