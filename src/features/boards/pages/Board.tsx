import { useBoardSockets } from "../hooks/useBoardSockets";
import { Button } from "../../../shared/components/button/Button";
import { Column } from "../../../features/columns/components/Column";
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useModalStore } from "../../../shared/stores/useModalStore";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import { useBoardData } from "../hooks/useBoardData";
import { Task } from "../../../features/tasks/components/Task";

export const Board: React.FC = () => {
  const { openModal } = useModalStore();
  const { boardId, isOwner, columns, tasks, isLoading } = useBoardData();
  const {
    handleDragOver,
    handleDragEnd,
    dndTasks,
    activeTask,
    handleDragStart,
  } = useDragAndDrop(boardId, tasks, columns);
  useBoardSockets(boardId);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 10,
      },
    })
  );

  const handleOpenCreateColumnModal = () => {
    openModal({ name: "CREATE_COLUMN" });
  };

  if (isLoading) return null;

  if (columns.length < 1 && isOwner)
    return (
      <div className="h-full flex flex-col gap-5 items-center justify-center">
        <h1 className="heading-l text-medium-gray">
          This board is empty. Create a new column to get started.
        </h1>
        <Button size="l" onClick={handleOpenCreateColumnModal}>
          + Add New Column
        </Button>
      </div>
    );

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div className="h-full w-full overflow-x-auto">
        <div className="flex h-full flex-row gap-x-4 min-w-fit p-4">
          {columns.map((column) => {
            const columnTasks = dndTasks
              .filter((task) => task.columnId === column._id)
              .sort((a, b) => a.order - b.order);

            return (
              <Column key={column._id} column={column} tasks={columnTasks} />
            );
          })}
          <DragOverlay>
            {activeTask && <Task isDragOverlay task={activeTask} />}
          </DragOverlay>
          <div className="w-[280px] flex items-center justify-center bg-[#ebf1fb] my-10 rounded-md">
            <button
              className="heading-xl text-medium-gray cursor-pointer"
              onClick={handleOpenCreateColumnModal}
            >
              + New Column
            </button>
          </div>
        </div>
      </div>
    </DndContext>
  );
};
