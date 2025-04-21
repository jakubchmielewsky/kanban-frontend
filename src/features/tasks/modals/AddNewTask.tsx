import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { TextInput } from "../../../shared/components/textInput/TextInput";
import { Button } from "../../../shared/components/button/Button";
import { Dropdown } from "../../../shared/components/Dropdown";
import { useGetColumns } from "../../columns/hooks/useGetColumns";
import { Column } from "../../../shared/types/column";
import { useCreateTask } from "../hooks/useCreateTask";
import { useCreateSubtask } from "../../../features/subtasks/hooks/useCreateSubtask";
import { SubtaskFormData } from "../../../shared/types/subtask";
import { TaskDto } from "../../../shared/types/task";

export const AddNewTask: React.FC = () => {
  const { boardId } = useParams();
  const columns = useGetColumns(boardId || "");
  const columnsData = useMemo(() => columns.data || [], [columns.data]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subtasks, setSubtasks] = useState<SubtaskFormData[]>([]);
  const [currentValue, setCurrentValue] = useState<Column | null>(null);

  const createTaskMutation = useCreateTask();
  const createSubtaskMutation = useCreateSubtask();

  useEffect(() => {
    if (columnsData.length && !currentValue) {
      setCurrentValue(columnsData[0]);
    }
  }, [columnsData, currentValue]);

  const handleSubtaskChange = (id: number, value: string) => {
    setSubtasks((prev) =>
      prev.map((subtask) =>
        subtask.tempId === id ? { ...subtask, title: value } : subtask
      )
    );
  };

  const handleSubtaskRemove = (id: number) => {
    setSubtasks((prev) => prev.filter((subtask) => subtask.tempId !== id));
  };

  const handleAddSubtask = () => {
    const newSubtask: SubtaskFormData = {
      title: "",
      tempId: Date.now() + Math.random(),
    };
    setSubtasks((prev) => [...prev, newSubtask]);
  };

  const handleCreateTask = async () => {
    if (!title.trim() || !currentValue) return;

    try {
      const newTask = await createTaskMutation.mutateAsync({
        title,
        description,
        column: currentValue._id,
      } satisfies TaskDto);

      await Promise.all(
        subtasks
          .filter((s) => s.title.trim() !== "")
          .map((subtask) =>
            createSubtaskMutation.mutateAsync({
              title: subtask.title,
              task: newTask._id,
            })
          )
      );

      setTitle("");
      setDescription("");
      setSubtasks([]);
      setCurrentValue(columnsData[0] || null);
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

      <div>
        {subtasks.length > 0 && (
          <h5 className="text-medium-gray body-l">Subtasks</h5>
        )}
        {subtasks.map((subtask) => (
          <TextInput
            placeholder="Subtask title"
            className="mb-2"
            key={subtask.tempId}
            value={subtask.title}
            isResetVisible
            onChange={(value) => handleSubtaskChange(subtask.tempId, value)}
            onReset={() => handleSubtaskRemove(subtask.tempId)}
          />
        ))}

        <Button
          variant="secondary"
          className="w-full"
          onClick={handleAddSubtask}
        >
          + Add New Subtask
        </Button>
      </div>

      <div>
        <h5 className="body-m text-medium-gray">Status</h5>

        {columnsData.length > 0 && currentValue && (
          <Dropdown
            options={columnsData}
            currentValue={currentValue}
            setValue={setCurrentValue}
          />
        )}
      </div>

      <Button variant="primary" onClick={handleCreateTask}>
        Create Task
      </Button>
    </div>
  );
};
