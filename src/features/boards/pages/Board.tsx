import { useEffect, useState } from "react";
import { useFetchColumns } from "../../columns/hooks/useFetchColumns";
import { useFetchTasks } from "../../tasks/hooks/useFetchTasks";
import { useBoardSockets } from "../hooks/useBoardSockets";
import { useSafeParams } from "../../../shared/hooks/useSafeParams";
import { Button } from "../../../shared/components/button/Button";
import { Column } from "../../../features/columns/components/Column";
import { Column as ColumnType } from "../../../shared/types/column";
import { Task as TaskType } from "../../../shared/types/task";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useUpdateTask } from "../../tasks/hooks/useUpdateTask";

export const Board: React.FC = () => {
  const { boardId } = useSafeParams();
  const columnsQuery = useFetchColumns();
  const tasksQuery = useFetchTasks(boardId);
  const updateTaskMutation = useUpdateTask(boardId);
  useBoardSockets(boardId);

  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    if (columnsQuery.data) {
      setColumns(columnsQuery.data);
    }
  }, [columnsQuery.data]);

  useEffect(() => {
    if (tasksQuery.data) {
      setTasks(tasksQuery.data);
    }
  }, [tasksQuery.data]);

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over, delta } = event;
    if (!active || !over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    if (activeId === overId) return;

    const activeTaskIndex = tasks.findIndex((task) => task._id === activeId);
    const overTaskIndex = tasks.findIndex((task) => task._id === overId);

    const activeTask = tasks[activeTaskIndex];
    const overTask = tasks[overTaskIndex];
    const overColumn = columns.find(
      (column) => column._id === overTask?.columnId
    );

    if (!overColumn) return;

    const overColumnTasks = tasks
      .filter((task) => task.columnId === overColumn._id)
      .sort((a, b) => a.order - b.order);

    const overColumnTaskIndex = overColumnTasks.findIndex(
      (task) => task._id === overTask._id
    );

    let newOrder = 0;

    if (activeTask.columnId === overTask.columnId) {
      // dragging in the same column

      if (overTask === overColumnTasks[0]) {
        //first element
        newOrder = overColumnTasks[0].order / 2;
      } else if (overTask === overColumnTasks[overColumnTasks.length - 1]) {
        //last element
        newOrder = overColumnTasks[overColumnTasks.length - 1].order + 1024;
      } else {
        if (delta.y > 0) {
          //dragging down
          newOrder =
            (overTask.order + overColumnTasks[overColumnTaskIndex + 1].order) /
            2;
        } else {
          //dragging up
          newOrder =
            (overTask.order + overColumnTasks[overColumnTaskIndex - 1].order) /
            2;
        }
      }
    } else {
      // dragging to different columns

      if (overTask == overColumnTasks[overColumnTasks.length - 1]) {
        //last element
        newOrder = overColumnTasks[overColumnTasks.length - 1].order + 1024;
      } else {
        newOrder =
          (overTask.order +
            (overColumnTasks[overColumnTaskIndex - 1]?.order || 0)) /
          2;
      }
    }

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task === activeTask
          ? { ...task, order: newOrder, columnId: overColumn._id }
          : task
      )
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active } = event;
    const taskId = active.id.toString();

    const task = tasks.find((task) => task._id === taskId);

    if (!task) return;

    updateTaskMutation.mutateAsync({
      taskId: task._id,
      updates: { columnId: task.columnId, order: task.order },
    });
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  if (!columnsQuery.data || !tasksQuery.data) return null;

  if (columns.length < 1)
    return (
      <div className="h-full flex flex-col gap-5 items-center justify-center">
        <h1 className="heading-l text-medium-gray">
          This board is empty. Create a new column to get started.
        </h1>
        <Button size="l">+ Add New Column</Button>
      </div>
    );

  return (
    <DndContext
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
      sensors={sensors}
    >
      <div className="h-full w-full overflow-x-auto">
        <div className="flex h-full flex-row gap-x-4 min-w-fit p-4">
          {columns.map((column) => {
            const columnTasks = tasks
              .filter((task) => task.columnId === column._id)
              .sort((a, b) => a.order - b.order);

            return (
              <Column key={column._id} column={column} tasks={columnTasks} />
            );
          })}
        </div>
      </div>
    </DndContext>
  );
};
