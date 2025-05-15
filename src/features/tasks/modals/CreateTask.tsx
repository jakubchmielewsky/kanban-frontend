import { AddSubtasksList } from "../components/AddSubtasksList";
import { TextInput } from "../../../shared/components/textInput/TextInput";
import { Button } from "../../../shared/components/button/Button";
import { useCreateTaskModal } from "../hooks/useCreateTaskModal";
import { Spinner } from "@/shared/components/Spinner";

interface Payload {
  payload: {
    targetColumnId: string;
    targetColumnName: string;
  };
}

export const CreateTask: React.FC<Payload> = ({ payload }) => {
  const { targetColumnId, targetColumnName } = payload;

  const {
    isPending,
    errors,
    formData,
    setFormData,
    handleAddSubtask,
    handleSubtaskChange,
    handleSubtaskRemove,
    handleSubmit,
  } = useCreateTaskModal(targetColumnId);

  const buttonContent = isPending ? (
    <Spinner />
  ) : errors?.api ? (
    errors.api
  ) : (
    "Create Task"
  );

  return (
    <div className="flex flex-col gap-4">
      <h3 className="heading-l">Add new task to "{targetColumnName}"</h3>

      <TextInput
        label="Title"
        value={formData.title}
        onChange={(value) => setFormData((prev) => ({ ...prev, title: value }))}
        error={errors?.title}
      />

      <TextInput
        label="Description"
        value={formData.description}
        onChange={(value) =>
          setFormData((prev) => ({ ...prev, description: value }))
        }
        error={errors?.description}
      />

      <AddSubtasksList
        subtasks={formData.subtasks}
        onAdd={handleAddSubtask}
        onChange={handleSubtaskChange}
        onRemove={handleSubtaskRemove}
      />

      <Button variant="primary" onClick={handleSubmit} disabled={isPending}>
        {buttonContent}
      </Button>
    </div>
  );
};
