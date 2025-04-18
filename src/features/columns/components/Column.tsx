import { useGetTasks } from "../../tasks/hooks/useGetTasks";
import { Column as ColumnType } from "../../../types/column";
import { Task } from "../../tasks/components/Task";

interface ColumnProps {
  column: ColumnType;
}

export const Column: React.FC<ColumnProps> = ({ column }) => {
  const tasks = useGetTasks(column._id);

  console.log(tasks);

  return (
    <div className="w-[280px]">
      <h3 className="heading-m text-medium-gray my-3 mx-3">
        {`${column.name.toUpperCase()} (${tasks.data?.length})`}
      </h3>
      <div className="flex flex-col gap-4">
        {tasks.data?.map((task) => {
          return <Task task={task} />;
        })}
      </div>
    </div>
  );
};
