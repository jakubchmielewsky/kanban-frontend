import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TextInput } from "../../../shared/components/textInput/TextInput";
import { Button } from "../../../shared/components/button/Button";
import { useGetColumns } from "../../columns/hooks/useGetColumns";
import { Column } from "../../../shared/types/column";
import { useCreateTask } from "../hooks/useCreateTask";
import { useCreateSubtask } from "../../../features/subtasks/hooks/useCreateSubtask";
import { AddSubtasksList } from "../components/AddSubtasksList";
import { SubtaskStatusDropdown } from "../components/SubtaskStatusDropdown";
import { useSubtasksList } from "../hooks/useSubtasksList";

export const AddNewTask: React.FC = () => {
  const { boardId } = useParams();
  const columnsQuery = useGetColumns(boardId!); //possibly unsafe '!'

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [currentValue, setCurrentValue] = useState<Column | null>(null);

  const createTaskMutation = useCreateTask();
  const createSubtaskMutation = useCreateSubtask();

  const {
    handleAddSubtask,
    handleSubtaskChange,
    handleSubtaskRemove,
    subtasks,
    setSubtasks,
  } = useSubtasksList();

  useEffect(() => {
    if (columnsQuery.data?.length && !currentValue) {
      setCurrentValue(columnsQuery.data[0]);
    }
  }, [columnsQuery.data, currentValue]);

  const handleCreateTask = async () => {
    if (!title.trim() || !currentValue) return;

    try {
      const newTask = await createTaskMutation.mutateAsync({
        title,
        description,
        column: currentValue._id,
      });

      await Promise.all(
        subtasks.map((subtask) =>
          createSubtaskMutation.mutateAsync({
            title: subtask.title,
            task: newTask._id,
          })
        )
      );

      setTitle("");
      setDescription("");
      setSubtasks([]);
      setCurrentValue((columnsQuery.data && columnsQuery.data[0]) || null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="heading-l">Add New Task</h3>

      <TextInput label="Title" value={title} onChange={setTitle} />

      <TextInput
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <AddSubtasksList
        subtasks={subtasks}
        onAdd={handleAddSubtask}
        onChange={handleSubtaskChange}
        onRemove={handleSubtaskRemove}
      />

      <SubtaskStatusDropdown
        columns={columnsQuery.data || null}
        currentValue={currentValue}
        setCurrentValue={setCurrentValue}
      />

      <Button variant="primary" onClick={handleCreateTask}>
        Create Task
      </Button>
    </div>
  );
};
