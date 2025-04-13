import { useState } from "react";
import { Button } from "../button/Button";
import IconShowSidebar from "../../../assets/icon-show-sidebar.svg?react";
import IconHideSidebar from "../../../assets/icon-hide-sidebar.svg?react";
import { useGetBoards } from "../../../features/boards/hooks/useGetBoards";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleShowSidebar = () => {
    setIsOpen(true);
  };

  const handleHideSidebar = () => {
    setIsOpen(false);
  };

  const boards = useGetBoards();

  //console.log(boards.data);

  return (
    <aside
      className={`relative h-full flex flex-col pt-4 pr-4 justify-between bg-white w-[260px] transition-all duration-300 border-r border-lines-light   ${
        isOpen ? "ml-0" : "-ml-[260px]"
      }`}
    >
      {/* Group 1 */}
      <div className="flex-grow">{/* TODO: Boardslist */}</div>
      {/* Group 2 */}
      <div className="mb-6">
        {/* Settings */}
        <Button
          className="w-full text-medium-gray"
          iconLeft={<IconHideSidebar />}
          size="l"
          variant="ghost"
          onClick={handleHideSidebar}
        >
          Hide Sidebar
        </Button>
      </div>
      {/* Hide button */}
      <Button
        isMenuButton
        className={`absolute bottom-10 translate-x-full right-0`}
        size="l"
        onClick={handleShowSidebar}
        hidden={isOpen}
      >
        <IconShowSidebar />
      </Button>
    </aside>
  );
};
