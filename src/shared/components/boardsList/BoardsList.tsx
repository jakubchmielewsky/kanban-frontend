import { useGetBoards } from "../../../features/boards/hooks/useGetBoards";
import { Button } from "../button/Button";
import IconBoard from "../../../assets/icon-board.svg?react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "../spinner/Spinner";

export const BoardsList: React.FC = () => {
  const boards = useGetBoards();
  const { boardId } = useParams();
  const navigate = useNavigate();

  if (!boards.data) return <Spinner />;

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
            onClick={() => navigate(`/boards/${board._id}`)}
            isSelected={board._id === boardId}
          >
            {board.name}
          </Button>
        );
      })}
      <Button
        iconLeft={<IconBoard className="text-main-purple" />}
        variant="ghost"
        className="text-main-purple pl-6"
        size="l"
      >
        + Create New Board
      </Button>
    </div>
  );
};
