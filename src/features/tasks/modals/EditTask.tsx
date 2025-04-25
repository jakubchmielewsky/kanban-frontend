import { useEffect, useState } from "react";
import { TextInput } from "../../../shared/components/textInput/TextInput";
import { Button } from "../../../shared/components/button/Button";
import { Dropdown } from "../../../shared/components/Dropdown";
import { AddSubtasksList } from "../../tasks/components/AddSubtasksList";
import { useGetColumns } from "../../columns/hooks/useGetColumns";
import { Column } from "../../../shared/types/column";
import { useGetOneTask } from "../../tasks/hooks/useGetOneTask";
import { useUpdateTask } from "../hooks/useUpdateTask";
import { Spinner } from "../../../shared/components/spinner/Spinner";
import { useModalStore } from "../../../shared/stores/useModalStore";

interface Props {
  payload: { taskId: string };
}

export const EditTask: React.FC<Props> = ({ payload }) => {
  const closeModal = useModalStore((s) => s.closeModal);
  const taskQuery = useGetOneTask(payload.taskId);
  const columnsQuery = useGetColumns();

  const updateTaskMutation = useUpdateTask();

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
    if (taskQuery.data?.column && columnsQuery.data && !selectedColumn)
      setSelectedColumn(
        columnsQuery.data.find(
          (column) => column._id === taskQuery.data.column
        ) ?? null
      );
  }, [taskQuery.data, columnsQuery.data, selectedColumn]);

  useEffect(() => {
    if (taskQuery.data) {
      const normalizedSubtasks = taskQuery.data.subtasks.map((subtask) => ({
        _id: subtask._id ?? crypto.randomUUID(),
        title: subtask.title,
        isCompleted: subtask.isCompleted,
      }));
      setLocalSubtasks(normalizedSubtasks);
    }
  }, [taskQuery.data]);

  useEffect(() => {
    if (taskQuery.data && !title) setTitle(taskQuery.data.title);

    if (taskQuery.data && !description)
      setDescription(taskQuery.data.description);
  }, [taskQuery.data, description, title]);

  if (taskQuery.isLoading || columnsQuery.isLoading)
    return <Spinner size="xl" />;
  if (!taskQuery.data || !columnsQuery.data) return null;

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
      task: {
        ...taskQuery.data,
        subtasks: localSubtasks.map((subtask) => ({
          title: subtask.title,
          isCompleted: subtask.isCompleted,
        })),
        column: selectedColumn._id,
      },
      sourceColumnId: taskQuery.data.column,
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
