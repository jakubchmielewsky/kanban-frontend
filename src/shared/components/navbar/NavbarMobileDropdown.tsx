import { useGetBoards } from "../../../features/boards/hooks/useGetBoards";
import { useParams } from "react-router-dom";
import IconChevronDown from "../../..//assets/icon-chevron-down.svg?react";
import IconChevronUp from "../../..//assets/icon-chevron-up.svg?react";
import { useState } from "react";
import { BoardsList } from "../boardsList/BoardsList";

export const NavbarMobileDropdown = () => {
  const boards = useGetBoards();
  const { boardId } = useParams();
  const selectedBoard = boards.data?.find((board) => board._id === boardId);
  const boardName = selectedBoard?.name ?? "Select Board";

  const [isOpen, setIsOpen] = useState(false);
  const onBoardSelect = () => {
    setIsOpen(false);
  };
  return (
    <div className="flex items-center gap-2 relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="heading-l text-[20px]"
      >
        {boardName}
      </button>
      {isOpen ? <IconChevronUp /> : <IconChevronDown />}

      {/* Dropdown */}
      {isOpen && (
        <div className="w-[260px]  absolute top-10 left-0 bg-white py-4 pr-4 rounded-lg shadow-xl border border-lines-light">
          <BoardsList onBoardSelect={onBoardSelect} />
        </div>
      )}
    </div>
  );
};
