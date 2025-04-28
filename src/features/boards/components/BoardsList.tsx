import { useFetchBoards } from "../hooks/useFetchBoards";
import { Button } from "../../../shared/components/button/Button";
import IconBoard from "../../../assets/icon-board.svg?react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "../../../shared/components/Spinner";
import { useModalStore } from "../../../shared/stores/useModalStore";
import IconOwner from "../../../assets/crown-svgrepo-com.svg?react";
import { useCurrentUser } from "../../auth/hooks/useCurrentUser";
import { useSafeParams } from "../../../shared/hooks/useSafeParams";

interface BoardsListProps {
  onBoardSelect?: () => void;
}

export const BoardsList: React.FC<BoardsListProps> = ({ onBoardSelect }) => {
  const boards = useFetchBoards();
  const { boardId } = useSafeParams();
  const navigate = useNavigate();
  const openModal = useModalStore((store) => store.openModal);
  const { user } = useCurrentUser();

  if (!boards.data) return <Spinner />;

  const handleSelectBoard = (boardId: string) => {
    navigate(`/boards/${boardId}`);
    if (onBoardSelect) onBoardSelect();
  };

  const handleCreateBoard = () => {
    openModal({ name: "CREATE_BOARD" });
  };

  return (
    <div>
      <h3 className="heading-m text-medium-gray mx-8 my-3">
        ALL BOARDS (<span>{boards.data.length}</span>)
      </h3>
      {boards.data.map((board) => {
        return (
          <Button
            key={board._id}
            iconLeft={
              <IconBoard
                className={`${
                  board._id === boardId ? "text-white" : "text-medium-gray"
                }`}
              />
            }
            variant={"menu"}
            className={`text-medium-gray w-full justify-start pl-6`}
            size="l"
            onClick={() => handleSelectBoard(board._id)}
            isSelected={board._id === boardId}
          >
            {<span className="min-w-fit">{board.name}</span>}
            {board.ownerId === user?._id && <IconOwner className="h-4" />}
          </Button>
        );
      })}
      <Button
        iconLeft={<IconBoard className="text-main-purple" />}
        variant="ghost"
        className="text-main-purple pl-6"
        size="l"
        onClick={handleCreateBoard}
      >
        + Create New Board
      </Button>
    </div>
  );
};
