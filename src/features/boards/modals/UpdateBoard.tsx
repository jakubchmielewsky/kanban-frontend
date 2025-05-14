import { TextInput } from "../../../shared/components/textInput/TextInput";
import { Button } from "../../../shared/components/button/Button";
import { Spinner } from "../../../shared/components/Spinner";
import { Board } from "../../../shared/types/board";
import { useUpdateBoardModal } from "../hooks/useUpdateBoardModal";

interface Props {
  payload: { board: Board };
}

export const UpdateBoard: React.FC<Props> = ({ payload }) => {
  const { boardName, errors, handleChange, handleUpdateBoard, isPending } =
    useUpdateBoardModal(payload.board.name, payload.board._id);
  return (
    <div>
      <h3 className="heading-l">Edit Board</h3>
      <TextInput
        value={boardName}
        onChange={handleChange}
        label="Board Name"
        className="mt-2"
        placeholder="e.g. Web Design"
        error={errors.boardName || errors.api}
      />
      <Button
        className="w-full mt-4"
        onClick={handleUpdateBoard}
        disabled={!boardName || isPending}
      >
        {isPending ? <Spinner /> : "Save Change"}
      </Button>
    </div>
  );
};
