import { TextInput } from "../../../shared/components/textInput/TextInput";
import { Button } from "../../../shared/components/button/Button";
import { AddSubtasksList } from "../../tasks/components/AddSubtasksList";
import { Spinner } from "../../../shared/components/Spinner";
import { Task } from "../../../shared/types/task";
import { useEditTaskModal } from "../hooks/useEditTaskModal";

interface Props {
  payload: { task: Task };
}

export const EditTask: React.FC<Props> = ({ payload }) => {
  const {
    formData,
    setFormData,
    handleSubmit,
    handleAddSubtask,
    handleSubtaskChange,
    handleSubtaskRemove,
    errors,
    isPending,
  } = useEditTaskModal(payload.task._id);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="heading-l">Edit Task</h3>

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
        // TODO: errors inside subtasks list
      />

      <Button variant="primary" onClick={handleSubmit} disabled={isPending}>
        {isPending ? <Spinner /> : "Save Changes"}
      </Button>
    </div>
  );
};
