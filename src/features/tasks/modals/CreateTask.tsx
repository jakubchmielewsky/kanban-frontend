import { useState } from "react";
import { TextInput } from "../../../shared/components/textInput/TextInput";
import { Button } from "../../../shared/components/button/Button";
import { useFetchColumns } from "../../columns/hooks/useFetchColumns";
import { useCreateTask } from "../hooks/useCreateTask";
import { AddSubtasksList } from "../components/AddSubtasksList";
import { Spinner } from "../../../shared/components/Spinner";
import { useModalStore } from "../../../shared/stores/useModalStore";
import { useSafeParams } from "../../../shared/hooks/useSafeParams";

interface Payload {
  payload: {
    targetColumnId: string;
    targetColumnName: string;
  };
}

export const CreateTask: React.FC<Payload> = ({ payload }) => {
  const { targetColumnId, targetColumnName } = payload;

  const closeModal = useModalStore((s) => s.closeModal);
  const { boardId } = useSafeParams();
  const columnsQuery = useFetchColumns();

  const createTaskMutation = useCreateTask(boardId);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [localSubtasks, setLocalSubtasks] = useState<
    {
      _id: string;
      title: string;
      isCompleted: boolean;
    }[]
  >([]);

  if (columnsQuery.isLoading) return <Spinner size="xl" />;
  if (!columnsQuery.data) return null;

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

  const handleSubmit = () => {
    const task = {
      title,
      description,
      subtasks: localSubtasks.map((subtask) => ({
        title: subtask.title,
        isCompleted: subtask.isCompleted,
      })),
      columnId: targetColumnId,
    };

    createTaskMutation.mutateAsync({ task: task });
    closeModal();
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="heading-l">Add new task to "{targetColumnName}"</h3>

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

      <Button variant="primary" onClick={handleSubmit}>
        Create Task
      </Button>
    </div>
  );
};
