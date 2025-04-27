import { useFetchTasks } from "../../tasks/hooks/useFetchTasks";
import { Column as ColumnType } from "../../../shared/types/column";
import { Task } from "../../tasks/components/Task";
import { useSafeParams } from "../../../shared/hooks/useSafeParams";
import { useMemo } from "react";

interface ColumnProps {
  column: ColumnType;
}

export const Column: React.FC<ColumnProps> = ({ column }) => {
  const { boardId } = useSafeParams();
  const tasksQuery = useFetchTasks(boardId);
  const tasks = useMemo(
    () =>
      tasksQuery.data
        ?.filter((task) => task.columnId === column._id)
        .sort((a, b) => a.order - b.order) || [],
    [tasksQuery.data, column._id]
  );

  return (
    <div className="w-[280px]">
      <h3 className="heading-m text-medium-gray my-3 ml-6">
        {`${column.name.toUpperCase()} (${tasks.length})`}
      </h3>
      <div className="flex flex-col gap-4">
        {tasks.map((task) => {
          return <Task task={task} key={task._id} />;
        })}
      </div>
    </div>
  );
};
