import { useState } from "react";
import IconChevronDown from "../../assets/icon-chevron-down.svg?react";
import IconChevronUp from "../../assets/icon-chevron-up.svg?react";
import { Column } from "../types/column";
import { useModalStore } from "../stores/useModalStore";

interface DropdownProps {
  currentValue: Column | null;
  options: Column[];
  setValue: (value: Column) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  currentValue,
  options,
  setValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = useModalStore((store) => store.closeModal);

  const handleToggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSetValue = (value: Column) => {
    setValue(value);
    setIsOpen(false);
    closeModal();
  };

  return (
    <div className="relative">
      <div
        className="flex items-center justify-between ring ring-main-purple w-full rounded-sm px-4 py-2 cursor-pointer body-l"
        onClick={handleToggleIsOpen}
      >
        {currentValue?.name}
        {isOpen ? <IconChevronUp /> : <IconChevronDown />}
      </div>

      {isOpen && (
        <div className="absolute bg-white px-4 py-2 w-full top-[125%] left-0 rounded-b-sm cursor-default z-50">
          {options.map((option) => {
            return (
              <div
                role="button"
                key={option._id}
                className="body-l not-first:mt-2 text-left py-2 px-4 cursor-pointer hover:bg-main-purple-hover rounded-sm"
                onClick={() => handleSetValue(option)}
              >
                {option.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
