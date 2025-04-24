import OptionsIcon from "../../../assets/icon-vertical-ellipsis.svg?react";
import { useGetSubtasks } from "../../subtasks/hooks/useGetSubtasks";
import { Subtask } from "../../subtasks/components/Subtask";
import { Dropdown } from "../../../shared/components/Dropdown";
import { useGetColumns } from "../../columns/hooks/useGetColumns";
import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useUpdateTask } from "../hooks/useUpdateTask";
import { Column } from "../../../shared/types/column";
import { useGetOneTask } from "../hooks/useGetOneTask";
import { useModalStore } from "../../../shared/stores/useModalStore";
import { useContextMenu } from "../../../shared/hooks/useContextMenu";
import { ContextMenu } from "../../../shared/components/ContextMenu";

interface ViewTaskModalProps {
  payload: { taskId: string };
}

export const ViewTask: React.FC<ViewTaskModalProps> = ({ payload }) => {
  const openModal = useModalStore((store) => store.openModal);
  const { isVisible, openContextMenu, closeContextMenu, coords } =
    useContextMenu();
  const { taskId } = payload;
  const { boardId } = useParams();

  const task = useGetOneTask(taskId);
  const subtasks = useGetSubtasks(taskId);
  const columns = useGetColumns(boardId || "");

  const completedSubtasks = useMemo(
    () => subtasks.data?.filter((s) => s.isCompleted).length || 0,
    [subtasks.data]
  );

  const totalSubtasks = subtasks.data?.length || 0;

  const [selectedColumn, setSelectedColumn] = useState<Column | null>(null);

  const updateTaskMutation = useUpdateTask();

  useEffect(() => {
    if (columns.data && task.data?.column) {
      const current = columns.data.find(
        (column) => column._id === task.data?.column
      );
      setSelectedColumn(current || null);
    }
  }, [columns.data, task.data?.column]);

  const handleSetValue = useCallback(
    (targetColumn: Column) => {
      if (targetColumn._id === task.data?.column) return;

      setSelectedColumn(targetColumn);

      if ((task.data?._id, targetColumn._id, task.data?.column)) {
        const updatedtask = { ...task.data };
        updatedtask.column = targetColumn._id;
        updateTaskMutation.mutateAsync({
          task: updatedtask,
          sourceColumnId: task.data?.column,
        });
      }
    },
    [updateTaskMutation, task.data]
  );

  const handleOpenEditTask = () => {
    openModal({ name: "EDIT_TASK", payload: { taskId: taskId } });
  };
  const handleOpenDeleteTask = () => {
    openModal({ name: "DELETE_TASK", payload: { taskId: taskId } });
  };

  return (
    <div>
      <div className="flex items center justify-between">
        <h3 className="heading-l">{task.data?.title}</h3>
        <button
          className="p-2 cursor-pointer"
          onClick={(e) => openContextMenu(e)}
        >
          <OptionsIcon />
        </button>
        {isVisible && (
          <ContextMenu x={coords.x} y={coords.y} close={closeContextMenu}>
            <li>
              <button
                className="cursor-pointer w-full text-left"
                onClick={handleOpenEditTask}
              >
                Edit
              </button>
            </li>
            <li>
              <button
                className="text-red cursor-pointer text-left"
                onClick={handleOpenDeleteTask}
              >
                Delete
              </button>
            </li>
          </ContextMenu>
        )}
      </div>

      <p className="mt-3 body-l text-medium-gray">{task.data?.description}</p>

      <h5 className="mt-5 mb-3 body-m text-medium-gray">{`Subtasks (${completedSubtasks} of ${totalSubtasks})`}</h5>
      {subtasks.data?.map((subtask) => {
        return <Subtask subtask={subtask} key={subtask._id} />;
      })}

      <h5 className="mt-5 mb-3 body-m text-medium-gray">Current Status</h5>

      <Dropdown
        options={columns.data || []}
        currentValue={selectedColumn}
        setValue={handleSetValue}
      />
    </div>
  );
};
