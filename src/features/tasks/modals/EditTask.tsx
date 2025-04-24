import React, { useEffect, useState } from "react";
import { TextInput } from "../../../shared/components/textInput/TextInput";
import { Button } from "../../../shared/components/button/Button";
import { Dropdown } from "../../../shared/components/Dropdown";
import { AddSubtasksList } from "../../tasks/components/AddSubtasksList";
import { useGetColumns } from "../../columns/hooks/useGetColumns";
import { Column } from "../../../shared/types/column";
import { useSubtasksList } from "../../tasks/hooks/useSubtasksList";
import { useGetOneTask } from "../../tasks/hooks/useGetOneTask";
import { useGetSubtasks } from "../../subtasks/hooks/useGetSubtasks";
import { useCreateSubtask } from "../../subtasks/hooks/useCreateSubtask";
import { useUpdateSubtask } from "../../subtasks/hooks/useUpdateSubtask";
import { useDeleteSubtask } from "../../subtasks/hooks/useDeleteSubtask";
import { useUpdateTask } from "../hooks/useUpdateTask";
import { useModalStore } from "../../../shared/stores/useModalStore";
import { Spinner } from "../../../shared/components/spinner/Spinner";
import { Task } from "../../../shared/types/task";
import { useParams } from "react-router-dom";

interface EditTaskPayload {
  taskId: string;
}

export const EditTask: React.FC = () => {
  const { current, closeModal } = useModalStore();
  const payload = current?.payload as EditTaskPayload;
  const taskId = payload.taskId;
  const { boardId } = useParams();

  const taskQuery = useGetOneTask(taskId);
  const columnsQuery = useGetColumns(boardId ?? "");
  const subtasksQuery = useGetSubtasks(taskId);

  const updateTaskMutation = useUpdateTask();
  const createSubtask = useCreateSubtask();
  const updateSubtask = useUpdateSubtask();
  const deleteSubtask = useDeleteSubtask();

  const {
    subtasks,
    handleAddSubtask,
    handleSubtaskChange,
    handleSubtaskRemove,
    setSubtasks,
  } = useSubtasksList();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColumn, setSelectedColumn] = useState<Column | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (taskQuery.data) {
      setTitle(taskQuery.data.title);
      setDescription(taskQuery.data.description);
    }
  }, [taskQuery.data]);

  useEffect(() => {
    if (columnsQuery.data && taskQuery.data) {
      const col = columnsQuery.data.find(
        (c) => c._id === taskQuery.data?.column
      );
      setSelectedColumn(col || null);
    }
    if (subtasksQuery.data) {
      setSubtasks(
        subtasksQuery.data.map((s, i) => ({
          tempId: i,
          title: s.title,
          _id: s._id,
        }))
      );
    }
  }, [columnsQuery.data, taskQuery.data, subtasksQuery.data, setSubtasks]);

  const isPending =
    updateTaskMutation.isPending ||
    createSubtask.isPending ||
    updateSubtask.isPending ||
    deleteSubtask.isPending;

  const handleSubmit = async () => {
    if (!taskQuery.data?._id) {
      setError("Task data not loaded yet");
      return;
    }

    setError(null);
    if (!title.trim()) return setError("Title cannot be empty");
    if (!selectedColumn) return setError("Select a status");

    const existingIds = subtasksQuery.data?.map((s) => s._id) || [];
    const localIds = subtasks.map((s) => s._id).filter(Boolean) as string[];

    const toDelete = existingIds.filter((id) => !localIds.includes(id));
    const toUpdate = subtasks.filter((s) => s._id);
    const toCreate = subtasks.filter((s) => !s._id);

    try {
      const updatedTask: Task = {
        ...taskQuery.data,
        title,
        description,
        column: selectedColumn._id,
      };
      await updateTaskMutation.mutateAsync({
        task: updatedTask,
        sourceColumnId: taskQuery.data?.column as string,
      });

      await Promise.all(
        toDelete.map((id) =>
          deleteSubtask.mutateAsync({ subtaskId: id, taskId })
        )
      );
      await Promise.all(toUpdate.map((s) => updateSubtask.mutateAsync(s)));
      await Promise.all(
        toCreate.map((s) =>
          createSubtask.mutateAsync({ title: s.title, task: taskId })
        )
      );

      closeModal();
    } catch (err) {
      setError("An error occurred, please try again.");
      console.error(err);
    }
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
        subtasks={subtasks}
        onAdd={handleAddSubtask}
        onChange={handleSubtaskChange}
        onRemove={handleSubtaskRemove}
      />

      <div>
        <h5 className="body-m mb-2 text-medium-gray">Status</h5>

        <Dropdown
          options={columnsQuery.data || []}
          currentValue={selectedColumn}
          setValue={setSelectedColumn}
        />
      </div>

      <Button variant="primary" onClick={handleSubmit} disabled={isPending}>
        {isPending ? <Spinner /> : "Save Changes"}
      </Button>
    </div>
  );
};
