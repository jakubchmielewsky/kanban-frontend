import { useEffect, useState } from "react";
import { TextInput } from "../../../shared/components/textInput/TextInput";
import { Button } from "../../../shared/components/button/Button";
import { useCreateColumn } from "../hooks/useCreateColumn";
import { Spinner } from "../../../shared/components/Spinner";
import { useModalStore } from "../../../shared/stores/useModalStore";
import { useSafeParams } from "../../../shared/hooks/useSafeParams";

export const CreateColumn: React.FC = () => {
  const [columnName, setColumnName] = useState("");
  const closeModal = useModalStore((store) => store.closeModal);
  const { boardId } = useSafeParams();

  const createColumnMutation = useCreateColumn();

  const handleCreateColumnMutation = () => {
    createColumnMutation.mutateAsync({ name: columnName, boardId });
  };

  useEffect(() => {
    if (createColumnMutation.isSuccess) closeModal();
  }, [createColumnMutation.isSuccess, closeModal]);

  return (
    <div>
      <h3 className="heading-l">Add New Column</h3>
      <TextInput
        value={columnName}
        onChange={setColumnName}
        label="Name"
        className="mt-2"
        placeholder="e.g. todo"
        error={createColumnMutation.error?.message}
      />
      <Button
        className="w-full mt-4"
        onClick={handleCreateColumnMutation}
        disabled={!columnName || createColumnMutation.isPending}
      >
        {createColumnMutation.isPending ? <Spinner /> : "Create New Column"}
      </Button>
    </div>
  );
};
