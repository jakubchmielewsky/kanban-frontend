import { Task } from "../../../shared/types/task";
import OptionsIcon from "../../../assets/icon-vertical-ellipsis.svg?react";
import { Button } from "../../../shared/components/button/Button";
import { useGetSubtasks } from "../../subtasks/hooks/useGetSubtasks";
import { Subtask } from "../../subtasks/components/Subtask";
import { Dropdown } from "../../../shared/components/Dropdown";
import { useGetColumns } from "../../columns/hooks/useGetColumns";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUpdateTaskStatus } from "../hooks/useUpdateTaskStatus";
import { Column } from "../../../shared/types/column";

interface ViewTaskModalProps {
  payload: { task: Task; completedSubtasks: number; totalSubtasks: number };
}

export const ViewTask: React.FC<ViewTaskModalProps> = ({ payload }) => {
  const { task, completedSubtasks, totalSubtasks } = payload;
  const { boardId } = useParams();

  const subtasks = useGetSubtasks(task._id);
  const columns = useGetColumns(boardId || "");

  const [selectedColumn, setSelectedColumn] = useState<Column | null>(null);

  const updateTaskStatusMutation = useUpdateTaskStatus();

  useEffect(() => {
    if (columns.data && !selectedColumn) {
      const current = columns.data.find((column) => column._id === task.column);
      setSelectedColumn(current || null);
    }
  }, [columns.data, selectedColumn, task.column]);

  const handleSetValue = (targetColumn: Column) => {
    if (targetColumn._id === task.column) return;

    setSelectedColumn(targetColumn);

    //FIXME: source column probably stays the same all the time so when updating status more than once it indicates wrong query to invalidate
    updateTaskStatusMutation.mutateAsync({
      taskId: task._id,
      targetColumnId: targetColumn._id,
      sourceColumnId: task.column,
    });
  };

  return (
    <div>
      <div className="flex items center justify-between">
        <h3 className="heading-l">{task.title}</h3>
        <Button variant="ghost">
          <OptionsIcon />
        </Button>
      </div>

      <p className="mt-3 body-l text-medium-gray">{task.description}</p>

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
