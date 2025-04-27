import { useEffect, useState } from "react";
import { TextInput } from "../../../shared/components/textInput/TextInput";
import { Button } from "../../../shared/components/button/Button";
import { Dropdown } from "../../../shared/components/Dropdown";
import { AddSubtasksList } from "../../tasks/components/AddSubtasksList";
import { useFetchColumns } from "../../columns/hooks/useFetchColumns";
import { Column } from "../../../shared/types/column";
import { useUpdateTask } from "../hooks/useUpdateTask";
import { Spinner } from "../../../shared/components/spinner/Spinner";
import { useModalStore } from "../../../shared/stores/useModalStore";
import { useSafeParams } from "../../../shared/hooks/useSafeParams";
import { useFetchTasks } from "../hooks/useFetchTasks";
import { Task } from "../../../shared/types/task";

interface Props {
  payload: { task: Task };
}

export const EditTask: React.FC<Props> = ({ payload }) => {
  const closeModal = useModalStore((s) => s.closeModal);

  const { boardId } = useSafeParams();
  const columnsQuery = useFetchColumns(boardId);
  const tasksQuery = useFetchTasks(boardId);
  const task = tasksQuery.data?.find((task) => task._id === payload.task._id);

  const updateTaskMutation = useUpdateTask(boardId);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColumn, setSelectedColumn] = useState<Column | null>();
  const [localSubtasks, setLocalSubtasks] = useState<
    {
      _id: string;
      title: string;
      isCompleted: boolean;
    }[]
  >([]);

  useEffect(() => {
    if (task?.columnId && columnsQuery.data && !selectedColumn)
      setSelectedColumn(
        columnsQuery.data.find((column) => column._id === task.columnId) ?? null
      );
  }, [task, columnsQuery.data, selectedColumn]);

  useEffect(() => {
    if (task) {
      const normalizedSubtasks = task.subtasks.map((subtask) => ({
        _id: subtask._id ?? crypto.randomUUID(),
        title: subtask.title,
        isCompleted: subtask.isCompleted,
      }));
      setLocalSubtasks(normalizedSubtasks);
    }
  }, [task]);

  useEffect(() => {
    if (task && !title) setTitle(task.title);

    if (task && !description) setDescription(task.description);
  }, [task, description, title]);

  if (!task || !columnsQuery.data) return null;

  const handleAddSubtask = () => {
    const newLocalSubtasks = [
      ...localSubtasks,
      { _id: crypto.randomUUID(), title: "", isCompleted: false },
    ];
    setLocalSubtasks(newLocalSubtasks);
  };

  const handleSubtaskChange = (_id: string, value: string) => {
    const newLocalSubtasks = localSubtasks.map((subtask) =>
      subtask._id === _id ? { ...subtask, title: value } : subtask
    );
    setLocalSubtasks(newLocalSubtasks);
  };

  const handleSubtaskRemove = (_id: string) => {
    const newLocalSubtasks = localSubtasks.filter(
      (subtask) => subtask._id !== _id
    );
    setLocalSubtasks(newLocalSubtasks);
  };

  const handleSelectColumn = (column: Column) => {
    setSelectedColumn(column);
  };

  const handleSubmit = () => {
    if (!selectedColumn) return;

    const payload = {
      taskId: task._id,
      updates: {
        ...task,
        subtasks: localSubtasks.map((subtask) => ({
          title: subtask.title,
          isCompleted: subtask.isCompleted,
        })),
        columnId: selectedColumn._id,
      },
    };

    updateTaskMutation.mutateAsync(payload);
    closeModal();
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="heading-l">Edit Task</h3>

      <TextInput label="Title" value={title} onChange={setTitle} />

      <TextInput
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <AddSubtasksList
        subtasks={localSubtasks}
        onAdd={handleAddSubtask}
        onChange={handleSubtaskChange}
        onRemove={handleSubtaskRemove}
      />

      <div>
        <h5 className="body-m mb-2 text-medium-gray">Status</h5>
        <Dropdown
          options={columnsQuery.data}
          currentValue={selectedColumn ?? null}
          handleSelect={handleSelectColumn}
        />
      </div>

      <Button
        variant="primary"
        onClick={handleSubmit}
        disabled={updateTaskMutation.isPending}
      >
        {updateTaskMutation.isPending ? <Spinner /> : "Save Changes"}
      </Button>
    </div>
  );
};
