import OptionsIcon from "../../../assets/icon-vertical-ellipsis.svg?react";
import { Button } from "../../../shared/components/button/Button";
import { useGetSubtasks } from "../../subtasks/hooks/useGetSubtasks";
import { Subtask } from "../../subtasks/components/Subtask";
import { Dropdown } from "../../../shared/components/Dropdown";
import { useGetColumns } from "../../columns/hooks/useGetColumns";
import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useUpdateTaskStatus } from "../hooks/useUpdateTaskStatus";
import { Column } from "../../../shared/types/column";
import { useGetOneTask } from "../hooks/useGetOneTask";

interface ViewTaskModalProps {
  payload: { taskId: string };
}

export const ViewTask: React.FC<ViewTaskModalProps> = ({ payload }) => {
  const { taskId } = payload;
  const { boardId } = useParams();

  const task = useGetOneTask(taskId);
  const subtasks = useGetSubtasks(taskId);
  const columns = useGetColumns(boardId || "");

  const completedSubtasks = useMemo(
    () => subtasks.data?.filter((s) => s.isCompleted).length || 0,
    [subtasks.data]
  );

  const totalSubtasks = useMemo(
    () => subtasks.data?.length || 0,
    [subtasks.data]
  );

  const [selectedColumn, setSelectedColumn] = useState<Column | null>(null);

  const updateTaskStatusMutation = useUpdateTaskStatus();

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
        updateTaskStatusMutation.mutateAsync({
          taskId: task.data?._id,
          targetColumnId: targetColumn._id,
          sourceColumnId: task.data?.column,
        });
      }
    },
    [task.data?._id, task.data?.column, updateTaskStatusMutation]
  );

  return (
    <div>
      <div className="flex items center justify-between">
        <h3 className="heading-l">{task.data?.title}</h3>
        <Button variant="ghost">
          <OptionsIcon />
        </Button>
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
