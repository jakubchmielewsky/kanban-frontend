import { useEffect, useRef, useState } from "react";
import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { Task } from "../../../shared/types/task";
import { Column } from "../../../shared/types/column";
import { useUpdateTask } from "../../tasks/hooks/useUpdateTask";

const GAP = 1024;

export const useDragAndDrop = (
  boardId: string,
  initialTasks: Task[],
  columns: Column[]
) => {
  const [dragTasks, setDragTasks] = useState<Task[]>(initialTasks);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const updateTask = useUpdateTask(boardId);

  useEffect(() => {
    setDragTasks((prev) => {
      const sameLength = prev.length === initialTasks.length;
      const sameContent =
        sameLength && prev.every((t, i) => t === initialTasks[i]);

      if (!sameContent) {
        return initialTasks;
      }

      return prev;
    });
  }, [initialTasks]);

  const handleDragStart = ({ active }: DragStartEvent) => {
    const task = dragTasks.find((t) => t._id === active.id.toString()) || null;
    setActiveTask(task);
  };

  const getTasksInColumn = (columnId: string) => {
    return dragTasks
      .filter((t) => t.columnId === columnId)
      .sort((a, b) => a.order - b.order);
  };

  const prevTopRef = useRef<number | null>(null);

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    const draggedTask = dragTasks.find((t) => t._id === activeTask?._id);
    if (!active || !over || !draggedTask) return;

    if (!event.over) return;
    const currentTop = event.over.rect.top;
    const prevTop = prevTopRef.current ?? currentTop;
    const movedDown = currentTop > prevTop;

    const overId = over.id.toString();

    const overColumn = columns.find((c) => c._id === overId);
    const overTask = dragTasks.find((t) => t._id === overId);

    if (overColumn) {
      const tasksInTargetColumn = getTasksInColumn(overColumn._id);
      const lastItemOrder =
        tasksInTargetColumn[tasksInTargetColumn.length - 1]?.order || 0;

      return setDragTasks((prev) =>
        prev.map((t) =>
          t._id === draggedTask?._id
            ? { ...t, columnId: overColumn._id, order: lastItemOrder + GAP }
            : t
        )
      );
    }

    if (overTask) {
      const targetColumnId = overTask.columnId;
      const tasksInTargetColumn = getTasksInColumn(targetColumnId);
      const overTaskIndex = tasksInTargetColumn.findIndex(
        (t) => t === overTask
      );

      const isColumnChanged = draggedTask.columnId !== targetColumnId;
      const isOverLastItem =
        overTask === tasksInTargetColumn[tasksInTargetColumn.length - 1];

      let newOrder;
      if (isColumnChanged) {
        // FIXME: bug with last element when dragging to different column
        newOrder =
          ((tasksInTargetColumn[overTaskIndex - 1]?.order ?? 0) +
            tasksInTargetColumn[overTaskIndex]?.order) /
          2;
      } else {
        if (overTask._id === draggedTask._id) {
          newOrder = overTask.order;
        } else if (isOverLastItem) {
          newOrder =
            tasksInTargetColumn[tasksInTargetColumn.length - 1]?.order + GAP;
        } else {
          if (movedDown) {
            newOrder =
              (tasksInTargetColumn[overTaskIndex + 1]?.order +
                tasksInTargetColumn[overTaskIndex]?.order) /
              2;
          } else {
            newOrder =
              ((tasksInTargetColumn[overTaskIndex - 1]?.order ?? 0) +
                tasksInTargetColumn[overTaskIndex]?.order) /
              2;
          }
        }
      }

      setDragTasks((prev) =>
        prev.map((t) =>
          t._id === draggedTask._id
            ? { ...t, order: newOrder, columnId: targetColumnId }
            : t
        )
      );
      prevTopRef.current = currentTop;
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const taskId = event.active.id.toString();
    const updatedTask = dragTasks.find((t) => t._id === taskId);
    if (
      !updatedTask ||
      (updatedTask.columnId === activeTask?.columnId &&
        updatedTask.order === activeTask.order)
    )
      return;

    updateTask.mutateAsync({
      taskId: updatedTask._id,
      updates: { columnId: updatedTask.columnId, order: updatedTask.order },
    });
    setActiveTask(null);
  };

  return {
    handleDragOver,
    handleDragEnd,
    dndTasks: dragTasks,
    activeTask,
    handleDragStart,
  };
};
