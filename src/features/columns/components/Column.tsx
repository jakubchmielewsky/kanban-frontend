import { Task as TaskComponent } from "../../tasks/components/Task";
import { Column as ColumnType } from "../../../shared/types/column";
import { Task as TaskType } from "../../../shared/types/task";
import { SortableContext } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

interface ColumnProps {
  column: ColumnType;
  tasks: TaskType[];
}

export const Column: React.FC<ColumnProps> = ({ column, tasks }) => {
  const { setNodeRef } = useDroppable({ id: column._id });
  return (
    <div className="w-[280px] flex flex-col">
      <h3 className="heading-m text-medium-gray my-3 ml-6">
        {`${column.name.toUpperCase()} (${tasks.length})`}
      </h3>
      <SortableContext items={tasks.map((task) => task._id)}>
        <div ref={setNodeRef} className="flex flex-col gap-4 grow">
          {tasks.map((task) => (
            <TaskComponent key={task._id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};
