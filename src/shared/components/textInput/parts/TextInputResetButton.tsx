import IconCross from "../../../../assets/icon-cross.svg?react";

interface TextInputResetButtonProps {
  onClick: () => void;
}

export const TextInputResetButton: React.FC<TextInputResetButtonProps> = ({
  onClick,
}) => (
  <button onClick={onClick} type="button" className="p-2 cursor-pointer">
    <IconCross />
  </button>
);
