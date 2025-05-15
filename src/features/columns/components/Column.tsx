import { Task as TaskComponent } from "../../tasks/components/Task";
import { Column as ColumnType } from "../../../shared/types/column";
import { Task as TaskType } from "../../../shared/types/task";
import { SortableContext } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { Button } from "@/shared/components/button/Button";
import { useModalStore } from "@/shared/stores/useModalStore";

interface ColumnProps {
  column: ColumnType;
  tasks: TaskType[];
}

export const Column: React.FC<ColumnProps> = ({ column, tasks }) => {
  const { setNodeRef } = useDroppable({ id: column._id });
  const openModal = useModalStore((s) => s.openModal);

  const handleAddNewTask = () => {
    openModal({
      name: "CREATE_TASK",
      payload: { targetColumnId: column._id, targetColumnName: column.name },
    });
  };

  return (
    <div className="w-[260px] flex flex-col bg-white shadow-lg h-fit rounded-lg p-2 gap-2">
      <h3 className="heading-m text-medium-gray my-3 text-center">
        {`${column.name.toUpperCase()} (${tasks.length})`}
      </h3>
      <div ref={setNodeRef} className="flex flex-col gap-2">
        <SortableContext items={tasks.map((task) => task._id)}>
          {tasks.map((task) => (
            <TaskComponent key={task._id} task={task} />
          ))}
        </SortableContext>
      </div>
      <Button
        variant="ghost"
        className="text-medium-gray"
        onClick={handleAddNewTask}
      >
        + Add task
      </Button>
    </div>
  );
};
