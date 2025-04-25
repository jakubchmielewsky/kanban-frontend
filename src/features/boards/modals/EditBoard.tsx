import { useEffect, useState } from "react";
import { TextInput } from "../../../shared/components/textInput/TextInput";
import { Button } from "../../../shared/components/button/Button";
import { Spinner } from "../../../shared/components/spinner/Spinner";
import { useModalStore } from "../../../shared/stores/useModalStore";
import { useUpdateBoard } from "../hooks/useUpdateBoard";
import { Board } from "../../../shared/types/board";

interface Props {
  payload: { board: Board };
}

export const EditBoard: React.FC<Props> = ({ payload }) => {
  const [boardName, setBoardName] = useState(payload.board.name);
  const closeModal = useModalStore((store) => store.closeModal);

  const updateBoardMutation = useUpdateBoard();

  const handleUpdateBoard = () => {
    updateBoardMutation.mutateAsync({ ...payload.board, name: boardName });
  };

  useEffect(() => {
    if (updateBoardMutation.isSuccess) closeModal();
  }, [updateBoardMutation.isSuccess, closeModal]);

  return (
    <div>
      <h3 className="heading-l">Edit Board</h3>
      <TextInput
        value={boardName}
        onChange={setBoardName}
        label="Board Name"
        className="mt-2"
        placeholder="e.g. Web Design"
        error={updateBoardMutation.error?.message}
      />
      <Button
        className="w-full mt-4"
        onClick={handleUpdateBoard}
        disabled={!boardName || updateBoardMutation.isPending}
      >
        {updateBoardMutation.isPending ? <Spinner /> : "Save Change"}
      </Button>
    </div>
  );
};
