import { TextInput } from "../../../shared/components/textInput/TextInput";
import { Button } from "../../../shared/components/button/Button";
import { Spinner } from "../../../shared/components/Spinner";
import { useCreateColumnModal } from "../hooks/useCreateColumnModal";

export const CreateColumn: React.FC = () => {
  const { columnName, setColumnName, errors, handleCreateColumn, isPending } =
    useCreateColumnModal();

  return (
    <div>
      <h3 className="heading-l">Add New Column</h3>
      <TextInput
        value={columnName}
        onChange={setColumnName}
        label="Name"
        className="mt-2"
        placeholder="e.g. todo"
        error={errors?.columnName}
      />
      <Button
        className="w-full mt-4"
        onClick={handleCreateColumn}
        disabled={isPending}
      >
        {isPending ? <Spinner /> : "Create New Column"}
      </Button>
    </div>
  );
};
