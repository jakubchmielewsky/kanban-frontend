import { useEffect, useState } from "react";
import { TextInput } from "../../../shared/components/textInput/TextInput";
import { Button } from "../../../shared/components/button/Button";
import { useCreateBoard } from "../hooks/useCreateBoard";
import { Spinner } from "../../../shared/components/spinner/Spinner";
import { useModalStore } from "../../../shared/stores/useModalStore";

export const CreateBoard: React.FC = () => {
  const [boardName, setBoardName] = useState("");
  const closeModal = useModalStore((store) => store.closeModal);

  const createBoard = useCreateBoard();

  const handleCreateBoard = () => {
    createBoard.mutateAsync({ name: boardName });
  };

  useEffect(() => {
    if (createBoard.isSuccess) closeModal();
  }, [createBoard.isSuccess, closeModal]);

  return (
    <div>
      <h3 className="heading-l">Add New Board</h3>
      <TextInput
        value={boardName}
        onChange={setBoardName}
        label="Name"
        className="mt-2"
        placeholder="e.g. Web Design"
        error={createBoard.error?.message}
      />
      <Button
        className="w-full mt-4"
        onClick={handleCreateBoard}
        disabled={!boardName || createBoard.isPending}
      >
        {createBoard.isPending ? <Spinner /> : "Create New Board"}
      </Button>
    </div>
  );
};
