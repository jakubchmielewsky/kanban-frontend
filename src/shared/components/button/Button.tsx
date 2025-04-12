import { buttonVariantClasses, buttonSizeClasses } from "./buttonVariants";

interface ButtonProps {
  variant?: "primary" | "secondary" | "destructive" | "ghost";
  size?: "l" | "s";
  className?: string;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  iconLeft?: React.ReactNode;
  disabled?: boolean;
  isMenuButton?: boolean;
  hidden?: boolean;
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
  isMenuButton = false,
  hidden = false,
}) => {
  const baseClasses = `flex items-center justify-center font-bold transition-colors px-4 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed ${
    isMenuButton ? "rounded-r-full" : "rounded-full"
  } ${hidden && "hidden"}`;

  const finalClassName = `${baseClasses} ${buttonVariantClasses[variant]} ${
    buttonSizeClasses[size]
  } ${className || ""}`;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={finalClassName}
    >
      {iconLeft && <span className={children ? "mr-2" : ""}>{iconLeft}</span>}
      {children}
    </button>
  );
};
