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
  const [dndTasks, setDndTasks] = useState<Task[]>([]);
  const [overlayItem, setOverlayItem] = useState<Task | null>(null);
  const updateTaskMutation = useUpdateTask(boardId);

  useEffect(() => {
    setDndTasks(initialTasks);
  }, [initialTasks]);

  const handleDragStart = ({ active }: DragStartEvent) => {
    const task = dndTasks.find((t) => t._id === active.id.toString()) || null;
    setOverlayItem(task);
  };

  const getTasksInCurrentColumn = (columnId: string) => {
    return dndTasks
      .filter((dndTask) => dndTask.columnId === columnId)
      .sort((a, b) => a.order - b.order);
  };

  const prevTopRef = useRef<number | null>(null);

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeTask = dndTasks.find((t) => t._id === activeId.toString());
    if (!activeTask) return;
    const overTask = dndTasks.find((t) => t._id === overId.toString());
    const overColumn = columns.find((c) => c._id === overId);

    const currentTop = event.over?.rect.top ?? 0;
    const prevTop = prevTopRef.current ?? currentTop;
    const movedDown = currentTop > prevTop;

    if (overTask) {
      setDndTasks((dndTasks) => {
        const tasksInCurrentColumn = getTasksInCurrentColumn(overTask.columnId);
        const overTaskIndexInCurrentColumn = tasksInCurrentColumn.findIndex(
          (t) => t._id === overTask._id
        );

        if (activeTask.columnId !== overTask.columnId) {
          const newColumnId = overTask.columnId;
          const newOrder =
            ((tasksInCurrentColumn[overTaskIndexInCurrentColumn - 1]?.order ??
              0) +
              tasksInCurrentColumn[overTaskIndexInCurrentColumn].order) /
            2;

          return dndTasks.map((dndTask) =>
            dndTask._id === activeTask._id
              ? { ...dndTask, columnId: newColumnId, order: newOrder }
              : dndTask
          );
        }
        return dndTasks.map((dndTask) => {
          if (dndTask._id === activeTask._id) {
            if (movedDown) {
              return {
                ...dndTask,
                order: tasksInCurrentColumn[overTaskIndexInCurrentColumn + 1]
                  ? ((tasksInCurrentColumn[overTaskIndexInCurrentColumn - 1]
                      ?.order ?? 0) +
                      tasksInCurrentColumn[overTaskIndexInCurrentColumn]
                        .order) /
                    2
                  : tasksInCurrentColumn[overTaskIndexInCurrentColumn].order +
                    GAP,
              };
            }

            return {
              ...dndTask,
              order:
                ((tasksInCurrentColumn[overTaskIndexInCurrentColumn - 1]
                  ?.order ?? 0) +
                  tasksInCurrentColumn[overTaskIndexInCurrentColumn].order) /
                2,
            };
          }
          return dndTask;
        });
      });
      return;
    }

    if (overColumn) {
      setDndTasks((dndTasks) => {
        const tasksInCurrentColumn = getTasksInCurrentColumn(overColumn._id);

        const lastElementOrder =
          tasksInCurrentColumn[tasksInCurrentColumn.length - 1]?.order ?? 0;

        return dndTasks.map((dndTask) =>
          dndTask._id === activeTask._id
            ? {
                ...dndTask,
                columnId: overColumn._id,
                order: lastElementOrder + GAP,
              }
            : dndTask
        );
      });
    }
    prevTopRef.current = currentTop;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const taskId = event.active.id.toString();
    const updatedTask = dndTasks.find((t) => t._id === taskId);

    if (
      !updatedTask ||
      (updatedTask.columnId === overlayItem?.columnId &&
        updatedTask.order === overlayItem?.order)
    )
      return;

    updateTaskMutation.mutateAsync({
      taskId: updatedTask._id,
      updates: { columnId: updatedTask.columnId, order: updatedTask.order },
    });

    setOverlayItem(null);
  };

  return {
    handleDragOver,
    handleDragEnd,
    dndTasks,
    activeTask: overlayItem,
    handleDragStart,
  };
};
