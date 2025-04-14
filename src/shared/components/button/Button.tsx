import { buttonVariantClasses, buttonSizeClasses } from "./buttonVariants";

interface ButtonProps {
  variant?: "primary" | "secondary" | "destructive" | "ghost" | "menu";
  size?: "l" | "s";
  className?: string;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  iconLeft?: React.ReactNode;
  disabled?: boolean;
  hidden?: boolean;
  isSelected?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "s",
  className,
  children,
  type = "button",
  iconLeft,
  disabled = false,
  onClick,
  hidden = false,
  isSelected = false,
}) => {
  const baseClasses = `flex items-center justify-center font-bold transition-colors px-4 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed ${
    variant === "menu" ? "rounded-r-full" : "rounded-full"
  }  `;

  const finalClassName = `${baseClasses} ${buttonVariantClasses[variant]} ${
    buttonSizeClasses[size]
  } ${isSelected && "bg-main-purple text-white"} ${hidden && "hidden"} ${
    className || ""
  }`;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={finalClassName}
    >
      {iconLeft && <span className={children ? "mr-4" : ""}>{iconLeft}</span>}
      {children}
    </button>
  );
};
