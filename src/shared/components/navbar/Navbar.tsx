import LogoMobile from "../../../assets/logo-mobile.svg?react";
import LogoDark from "../../../assets/logo-dark.svg?react";
import { useIsMobile } from "../../hooks/useIsMobile";
import IconVerticalEllipsis from "../../../assets/icon-vertical-ellipsis.svg?react";
import { useFetchBoards } from "../../../features/boards/hooks/useFetchBoards";
import { useModalStore } from "../../stores/useModalStore";
import { ContextMenu } from "../ContextMenu";
import { useContextMenu } from "../../hooks/useContextMenu";
import { useSafeParams } from "../../hooks/useSafeParams";
import { useCurrentUser } from "../../../features/auth/hooks/useCurrentUser";

export const Navbar: React.FC = () => {
  const isMobile = useIsMobile();
  const boards = useFetchBoards();
  const { boardId } = useSafeParams();
  const selectedBoard =
    boards.data?.find((board) => board._id === boardId) || null;
  const openModal = useModalStore((store) => store.openModal);
  const { isContextMenuVisible, openContextMenu, closeContextMenu, coords } =
    useContextMenu();
  const { user } = useCurrentUser();

  const handleEditBoard = () => {
    if (!selectedBoard) return;
    openModal({
      name: "UPDATE_BOARD",
      payload: { board: selectedBoard },
    });
    closeContextMenu();
  };

  const handleDeleteBoard = () => {
    if (!selectedBoard) return;
    openModal({ name: "DELETE_BOARD", payload: { board: selectedBoard } });
    closeContextMenu();
  };

  const handleBoardMembers = () => {
    openModal({ name: "MANAGE_MEMBERS" });
    closeContextMenu();
  };

  const userIsOwner = user?._id === selectedBoard?.ownerId;

  return (
    <nav
      className={`h-17 pr-2 flex items center justify-between ${
        isMobile ? "h-17" : "h-20"
      }`}
    >
      {!isMobile && (
        <div className="pl-4 h-full  flex items-center w-[260px] border-r border-lines-light">
          <LogoDark />
        </div>
      )}

      {/* Group 1 */}
      <div className="flex items-center gap-x-4 h-full flex-grow px-4">
        {isMobile && <LogoMobile />}
        <h2 className="heading-l text-[20px]">{selectedBoard?.name}</h2>
      </div>

      {/* Group 2 */}
      <div className="flex items-center gap-x-2">
        {/* TODO: implement user panel here */}
        {userIsOwner && (
          <button
            className="p-4 cursor-pointer"
            onClick={(e: React.MouseEvent) => openContextMenu(e)}
          >
            <IconVerticalEllipsis />
          </button>
        )}
      </div>

      {isContextMenuVisible && (
        <ContextMenu x={coords.x} y={coords.y} close={closeContextMenu}>
          <li>
            <button
              className="body-l w-full text-left text-medium-gray cursor-pointer"
              onClick={handleEditBoard}
            >
              Edit Board
            </button>
          </li>
          <li>
            <button
              className="body-l w-full text-left text-red cursor-pointer"
              onClick={handleDeleteBoard}
            >
              Delete Board
            </button>
          </li>
          <li>
            <button
              className="body-l w-full text-left text-black cursor-pointer"
              onClick={handleBoardMembers}
            >
              Members
            </button>
          </li>
        </ContextMenu>
      )}
    </nav>
  );
};
