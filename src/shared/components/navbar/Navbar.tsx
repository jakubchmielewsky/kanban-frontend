import LogoMobile from "../../../assets/logo-mobile.svg?react";
import LogoDark from "../../../assets/logo-dark.svg?react";
import { useIsMobile } from "../../hooks/useIsMobile";
import IconAdd from "../../../assets/icon-add-task-mobile.svg?react";
import IconVerticalEllipsis from "../../../assets/icon-vertical-ellipsis.svg?react";
import { Button } from "../button/Button";
import { useGetBoards } from "../../../features/boards/hooks/useGetBoards";
import { useParams } from "react-router-dom";
import { NavbarMobileDropdown } from "./NavbarMobileDropdown";
import { useModalStore } from "../../stores/useModalStore";

export const Navbar: React.FC = () => {
  const isMobile = useIsMobile();
  const boards = useGetBoards();
  const { boardId } = useParams();
  const selectedBoard = boards.data?.find((board) => board._id === boardId);
  const openModal = useModalStore((store) => store.openModal);

  const handleAddNewTask = () => {
    openModal({ name: "ADD_TASK" });
  };

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
        {isMobile ? (
          <NavbarMobileDropdown />
        ) : (
          <h2 className="heading-l text-[20px]">{selectedBoard?.name}</h2>
        )}
      </div>

      {/* Group 2 */}
      <div className="flex items-center gap-x-2">
        <Button
          size={isMobile ? "s" : "l"}
          iconLeft={isMobile && <IconAdd />}
          onClick={handleAddNewTask}
        >
          {!isMobile && "+ Add New Task"}
        </Button>
        <Button variant="ghost">
          <IconVerticalEllipsis />
        </Button>
      </div>
    </nav>
  );
};
