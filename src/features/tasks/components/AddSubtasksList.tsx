import { Button } from "../../../shared/components/button/Button";
import { TextInput } from "../../../shared/components/textInput/TextInput";

interface Props {
  subtasks: {
    _id: string;
    title: string;
    isCompleted: boolean;
  }[];
  onChange: (_id: string, value: string) => void;
  onRemove: (_id: string) => void;
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
          key={subtask._id}
          value={subtask.title}
          isResetVisible
          onChange={(value) => onChange(subtask._id, value)}
          onReset={() => onRemove(subtask._id)}
        />
      ))}

      <Button variant="secondary" className="w-full" onClick={onAdd}>
        + Add New Subtask
      </Button>
    </div>
  );
};
