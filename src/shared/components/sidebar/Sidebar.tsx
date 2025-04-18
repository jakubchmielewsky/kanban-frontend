import { useState } from "react";
import { Button } from "../button/Button";
import IconShowSidebar from "../../../assets/icon-show-sidebar.svg?react";
import IconHideSidebar from "../../../assets/icon-hide-sidebar.svg?react";
import { BoardsList } from "../../../features/boards/components/BoardsList";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleShowSidebar = () => {
    setIsOpen(true);
  };

  const handleHideSidebar = () => {
    setIsOpen(false);
  };

  return (
    <aside
      className={`relative h-full flex flex-col pt-4 pr-4 justify-between bg-white w-[260px] shrink-0 transition-all duration-300 border-r border-lines-light   ${
        isOpen ? "ml-0" : "-ml-[260px]"
      }`}
    >
      {/* Group 1 */}
      <div className="flex-grow">
        <BoardsList />
      </div>
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
        variant="menu"
        className={`absolute bottom-10 translate-x-full right-0`}
        isSelected={true}
        size="l"
        onClick={handleShowSidebar}
        hidden={isOpen}
      >
        <IconShowSidebar />
      </Button>
    </aside>
  );
};
