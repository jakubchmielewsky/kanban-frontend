import { Button } from "../../../shared/components/button/Button";
import { useModalStore } from "../../../shared/stores/useModalStore";
import { Board } from "../../../shared/types/board";
import { useDeleteBoard } from "../hooks/useDeleteBoard";

interface Props {
  payload: { board: Board };
}

export const DeleteBoard: React.FC<Props> = ({ payload }) => {
  const board = payload.board;
  const deleteBoardMutation = useDeleteBoard();
  const closeModal = useModalStore((s) => s.closeModal);

  const handleDeleteBoard = (): void => {
    deleteBoardMutation.mutateAsync(board._id);
    closeModal();
  };

  const handleCancel = (): void => {
    closeModal();
  };
  return (
    <div className="space-y-6">
      <h3 className="heading-l text-red">Delete this Board?</h3>
      <p className="body-l text-medium-gray">{`Are you sure you want to delete the '${board.name}' board? This action will remove all columns and tasks and cannot be reversed.`}</p>
      <div className="flex gap-4">
        <Button
          variant="destructive"
          className="grow"
          onClick={handleDeleteBoard}
        >
          Delete
        </Button>
        <Button variant="secondary" className="grow" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
