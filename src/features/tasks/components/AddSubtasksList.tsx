import { Button } from "../../../shared/components/button/Button";
import { TextInput } from "../../../shared/components/textInput/TextInput";
import { SubtaskFormData } from "../../../shared/types/subtask";

interface Props {
  subtasks: SubtaskFormData[];
  onChange: (id: number, value: string) => void;
  onRemove: (id: number) => void;
  onAdd: () => void;
}

export const AddSubtasksList: React.FC<Props> = ({
  subtasks,
  onChange,
  onRemove,
  onAdd,
}) => {
  return (
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
          onChange={(value) => onChange(subtask.tempId, value)}
          onReset={() => onRemove(subtask.tempId)}
        />
      ))}

      <Button variant="secondary" className="w-full" onClick={onAdd}>
        + Add New Subtask
      </Button>
    </div>
  );
};
