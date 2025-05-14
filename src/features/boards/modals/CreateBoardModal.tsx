import { TextInput } from "../../../shared/components/textInput/TextInput";
import { Button } from "../../../shared/components/button/Button";
import { Spinner } from "../../../shared/components/Spinner";
import { useCreateBoardModal } from "../hooks/useCreateBoardModal";

export const CreateBoardModal: React.FC = () => {
  const { boardName, errors, handleChange, handleCreateBoard, isPending } =
    useCreateBoardModal();

  return (
    <div>
      <h3 className="heading-l">Add New Board</h3>
      <TextInput
        value={boardName}
        onChange={handleChange}
        label="Name"
        className="mt-2"
        placeholder="e.g. Web Design"
        error={errors.boardName || errors.api}
      />
      <Button
        className="w-full mt-4"
        onClick={handleCreateBoard}
        disabled={!boardName || isPending}
      >
        {isPending ? <Spinner /> : "Create New Board"}
      </Button>
    </div>
  );
};
